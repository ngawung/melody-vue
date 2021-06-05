import { resolve } from "path";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";

const file = resolve("post/PostList.json");
const db = new JsonDB(new Config(file, true, false, "/"))

const args = process.argv.slice(2);

if (args.length == 0) printHelp();

switch(args[0]) {
    case "create":
        if (args.length < 3) printHelp();
        db.push(`/${args[1]}`, [
                {
                    name: args[2],
                    date: Math.floor(new Date().getTime() / 1000),
                    file: args[2],
                }
            ], false);
        process.exit(0);

    case "generate":
    process.exit(0);

    case "clean":
    process.exit(0);

    default:
        printHelp();
        process.exit(0);
}

function printHelp() {
    console.log("create <type> <filename>    # Create new post");
    console.log("generate                    # Generate post list and copy to public");
    console.log("clean                       # remove post in public");

    process.exit(0);
}