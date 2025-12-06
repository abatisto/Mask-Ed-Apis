import * as fs from "fs";
import { Transform } from "stream";
import { pipeline } from "stream/promises";
import * as c2j from "csvtojson";
import * as j2c from "json2csv-stream";

export class CSVParser {
    public filename: string;

    constructor(filename: string) { 
        this.filename = filename;
    }

    public getFileInfo(): string[] {
        const fileContent = fs.readFileSync(this.filename, "utf-8");
        const lines = fileContent.split(/\r?\n/);
        const headerLine = lines[0];
        if (!headerLine) return [];
        const headers = headerLine.split(",");
        return headers.map(h => h.trim());
    }

    public async runTransformPipeline(transforms: Transform[], destFileName: string) {
        console.log(`Running Transform Pipeline from ${this.filename} to ${destFileName} applying ${transforms.length} transform(s)`)
        let srcStream = fs.createReadStream(this.filename);
        let destStream = fs.createWriteStream(destFileName);
        let headers = this.getFileInfo();

        let json2csv = j2c.default({keys:Array.from(headers), objectMode:true})
        let csv2Json = c2j.csv({flatKeys:true});

        let i = 0;

        csv2Json
            .on('data', () => {
                i++;
            })

        destStream
            .on('error', (err) => {
                console.log(err)
            })
            .on('finish', () => {
                if(i===0){
                    let headerStr = "\""+Array.from(headers).join("\", \"")+"\"\n"
                    fs.writeFileSync(destFileName, headerStr);
                }
            })

        await pipeline([
            srcStream,
            csv2Json,
            ...transforms,
            json2csv,
            destStream
        ])

        return;
    }
}
