import { resolve } from "path";
import fs from "fs";
import fm from "front-matter";

//// Config ////

const config = {
    MAX_PAGINATION: 3,
    MAX_LASTUPDATE: 3,

    PATH_POSTPATH: resolve("public/content"),
    PATH_MAIN_MANIFEST: resolve("src/manifest.json/"),
    PATH_MANIFEST: resolve("public/content/manifest/"),
}

////////////////

const FrontMatter = {
    hotsprings: {
        title: "Your Title",
        date: Math.floor(new Date().getTime() / 1000),
        lastupdate: Math.floor(new Date().getTime() / 1000),
        category: "Uncategorized",
    },
    gallery: {
        title: "Your Title",
        date: Math.floor(new Date().getTime() / 1000),
        lastupdate: Math.floor(new Date().getTime() / 1000),
        category: "Uncategorized",
        image: "your/path/here",
    }
}

// create folder recursive
for (let key in FrontMatter) fs.mkdirSync(resolve(config.PATH_POSTPATH, key), { recursive: true });
fs.mkdirSync(resolve(config.PATH_MANIFEST), { recursive: true });

const args = process.argv.slice(2);
if (args.length == 0) printHelp();

switch(args[0]) {
    case "create":
        if (args.length < 3) printHelp();
        const category = args[1];
        const filename = args[2];
        
        // check if category invalid
        if (FrontMatter[category] == undefined) printHelp();

        // get year and month now
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const finalPath = resolve(config.PATH_POSTPATH, category, `${year}/${month}`);
        fs.mkdirSync(finalPath, { recursive: true });

        // check if file already exist
        if (fs.existsSync(resolve(finalPath, filename))) {
            console.log(`file ${resolve(finalPath, filename)} already exist!`);
            process.exit(0);
        }
        
        let content = "---\n";
        for (let key in FrontMatter[category]) content += `${key}: ${FrontMatter[category][key]}\n`
        content += "---\n"

        fs.writeFileSync(resolve(finalPath, filename), content);
        console.log(`Created post in ${resolve(finalPath, filename)}`);
        process.exit(0);

    //////////////////////////

    case "generate":
        // remove folder
        fs.rmSync(config.PATH_MANIFEST, { recursive: true, force: true });
        fs.mkdirSync(resolve(config.PATH_MANIFEST), { recursive: true });

        const manifest = {
        }

        for (let category in FrontMatter) {

            // create category object
            manifest[category] = {};

            // list all post in category
            let postArray = getAllFiles(resolve(config.PATH_POSTPATH, category))

            // map array
            postArray = postArray.map(x => {
                const data = fs.readFileSync(x, { encoding: "utf-8" });
                const dataResult = fm(data)
                const category_array = dataResult.attributes.category.split(",").map(x => x.trim());
                return {
                    filename: x.slice(resolve(config.PATH_POSTPATH, category).length + 1, -3),
                    date: dataResult.attributes.date,
                    title: dataResult.attributes.title,
                    category: category_array,
                };
            })

            // sort array
            postArray.sort((a, b) => b.date - a.date);

            // adding next and prev post frontmatter
            for (let i=0; i<postArray.length; i++) {
                const data2 = fs.readFileSync(resolve(config.PATH_POSTPATH, category, postArray[i].filename) + ".md", { encoding: "utf-8" });
                const dataResult2 = fm(data2)

                // next post
                if (!((i-1) < 0)) {
                    dataResult2.attributes.nextFile = postArray[i-1].filename
                    dataResult2.attributes.nextTitle = postArray[i-1].title
                }

                // prev post
                if (!((i+1) > (postArray.length-1))) {
                    dataResult2.attributes.prevFile = postArray[i+1].filename
                    dataResult2.attributes.prevTitle = postArray[i+1].title
                }

                // update post
                let output = "---\n"
                for (let key in dataResult2.attributes) {
                    output += `${key}: ${dataResult2.attributes[key]}\n`
                }
                output += `---\n\n${dataResult2.body}`

                // replace old file
                fs.writeFileSync(resolve(config.PATH_POSTPATH, category, postArray[i].filename) + ".md", output);
            }

            let paginationTotal = 0;
            let lastUpdatePost = [];
            
            // default pagination
            for (let i = 0; i < postArray.length; i += config.MAX_PAGINATION) {
                const chunk = postArray.slice(i, i + config.MAX_PAGINATION);
                paginationTotal++;

                if (i == 0) lastUpdatePost = chunk;

                // save individual pagination manifest
                fs.writeFileSync(
                    resolve(config.PATH_MANIFEST, `${category}-default-${paginationTotal}.json`),
                    JSON.stringify(chunk)
                );
            }

            // save pagination data to main manifest
            manifest[category]["default"] = {
                total: paginationTotal,
                lastUpdate: lastUpdatePost,
            }


            // add new meta to frontmatter


            // for future me... have fun fixing this shit... :)
            // const category_array = [];

            // // list all category;
            // postArray.forEach(x => {
            //     x.category.forEach(x => {
            //         if (!category_array.indexOf(x)) category_array.push(x);
            //     })
            // })

            // // create individual category manifest
            // category_array.forEach(x => {
            //     const individual_category = [];
            //     postArray.forEach(post => {
            //         if (post.category.split(","))
            //     })
            // })
        }

        // save main manifest
        fs.writeFileSync(
            config.PATH_MAIN_MANIFEST,
            JSON.stringify(manifest)
        );

        console.log("Manifest Generated!");
        process.exit(0);

    //////////////////////////

    case "update":

        for (let category in FrontMatter) {
            // list all post in category
            let postArray = getAllFiles(resolve(config.PATH_POSTPATH, category))
    
            postArray.forEach(post => {
                const data = fs.readFileSync(post, { encoding: "utf-8" });
                const dataResult = fm(data)

                for (let key in FrontMatter[category]) {
                    if (dataResult.attributes[key] == null) {
                        // add new frontmatter
                        dataResult.attributes[key] = FrontMatter[category][key]
                    }
                }

                // format string
                let output = "---\n"
                for (let key in dataResult.attributes) {
                    output += `${key}: ${dataResult.attributes[key]}\n`
                }
                output += `---\n\n${dataResult.body}`

                // replace old file
                fs.writeFileSync(post, output);
            })
        }

        process.exit(0);

    //////////////////////////

    default: printHelp();
}

function printHelp() {
    console.log("create <category> <filename>  # Create new post");
    console.log("generate                      # Generate post list");
    console.log("update                        # update frontmatter");
    console.log("");

    let FrontKey = []
    for (let key in FrontMatter) FrontKey.push(key);

    console.log("List possible category");
    console.log(FrontKey.toString());

    process.exit(0);
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(resolve(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(resolve(dirPath, file), arrayOfFiles)
        } else {
            arrayOfFiles.push(resolve(dirPath, file))
        }
    })

    return arrayOfFiles
}