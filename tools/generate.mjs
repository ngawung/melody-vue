import { resolve } from "path";
import fs from "fs";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import fm from "front-matter";

const PostPath = resolve("public/content");
const FrontMatter = {
    hotsprings: {
        title: "Your Title",
        date: Math.floor(new Date().getTime() / 1000),
        category: "Uncategorized",
    },
    gallery: {
        title: "Your Title",
        date: Math.floor(new Date().getTime() / 1000),
        category: "Uncategorized",
        image: "your/path/here",
    }
}

for (let key in FrontMatter) fs.mkdirSync(resolve(PostPath, key), { recursive: true });

const args = process.argv.slice(2);
if (args.length == 0) printHelp();

switch(args[0]) {
    case "create":
        if (args.length < 3) printHelp();
        const category = args[1];
        const filename = args[2];
        const finalPath = resolve(PostPath, category, filename);
        if (FrontMatter[category] == undefined) printHelp();
        
        let content = "---\n";
        for (let key in FrontMatter[category]) content += `${key}: ${FrontMatter[category][key]}\n`
        content += "---\n"

        fs.writeFileSync(finalPath, content);
        console.log(`Created post in ${finalPath}`);
        process.exit(0);

    //////////////////////////

    case "generate":
        // const manifest = resolve("public/content/manifest/manifest.json");
        // let db = new JsonDB(new Config(manifest, true, false, "/"))

        const manifest = {
            category = [],
            
        }

        for (let category in FrontMatter) {
            let postArray = fs.readdirSync(resolve(PostPath, category));
            postArray.forEach(x => {
                const data = fs.readFileSync(resolve(PostPath, category, x), { encoding: "utf-8" });
                const dateResult = fm(data)
                console.log(dateResult)
            })

            
        }
        process.exit(0);

    //////////////////////////

    case "clean":
    process.exit(0);

    //////////////////////////

    default: printHelp();
}

function printHelp() {
    console.log("create <category> <filename>  # Create new post");
    console.log("generate                      # Generate post list");
    console.log("clean                         # remove post list");
    console.log("");

    let FrontKey = []
    for (let key in FrontMatter) FrontKey.push(key);

    console.log("List possible category");
    console.log(FrontKey.toString());

    process.exit(0);
}