"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVParser = void 0;
const fs = __importStar(require("fs"));
const promises_1 = require("stream/promises");
const c2j = __importStar(require("csvtojson"));
const j2c = __importStar(require("json2csv-stream"));
class CSVParser {
    constructor(filename) {
        this.filename = filename;
    }
    getFileInfo() {
        const fileContent = fs.readFileSync(this.filename, "utf-8");
        const lines = fileContent.split(/\r?\n/);
        const headerLine = lines[0];
        if (!headerLine)
            return [];
        const headers = headerLine.split(",");
        return headers.map(h => h.trim());
    }
    async runTransformPipeline(transforms, destFileName) {
        console.log(`Running Transform Pipeline from ${this.filename} to ${destFileName} applying ${transforms.length} transform(s)`);
        let srcStream = fs.createReadStream(this.filename);
        let destStream = fs.createWriteStream(destFileName);
        let headers = this.getFileInfo();
        let json2csv = j2c.default({ keys: Array.from(headers), objectMode: true });
        let csv2Json = c2j.csv({ flatKeys: true });
        let i = 0;
        csv2Json
            .on('data', (chunk) => {
            i++;
        });
        destStream
            .on('error', (err) => {
            console.log(err);
        })
            .on('finish', () => {
            if (i === 0) {
                let headerStr = "\"" + Array.from(headers).join("\", \"") + "\"\n";
                fs.writeFileSync(destFileName, headerStr);
            }
        });
        await promises_1.pipeline([
            srcStream,
            csv2Json,
            ...transforms,
            json2csv,
            destStream
        ]);
        return;
    }
}
exports.CSVParser = CSVParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1NWUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsYXNzZXMvQ1NWUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFFekIsOENBQTJDO0FBQzNDLCtDQUFpQztBQUNqQyxxREFBdUM7QUFFdkMsTUFBYSxTQUFTO0lBR2xCLFlBQVksUUFBZ0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVNLFdBQVc7UUFDZCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMzQixNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBdUIsRUFBRSxZQUFvQjtRQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsUUFBUSxPQUFPLFlBQVksYUFBYSxVQUFVLENBQUMsTUFBTSxlQUFlLENBQUMsQ0FBQTtRQUM3SCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFakMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ3ZFLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFVixRQUFRO2FBQ0gsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xCLENBQUMsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUE7UUFFTixVQUFVO2FBQ0wsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDZixJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUM7Z0JBQ0wsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFDLE1BQU0sQ0FBQTtnQkFDOUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVOLE1BQU0sbUJBQVEsQ0FBQztZQUNYLFNBQVM7WUFDVCxRQUFRO1lBQ1IsR0FBRyxVQUFVO1lBQ2IsUUFBUTtZQUNSLFVBQVU7U0FDYixDQUFDLENBQUE7UUFFRixPQUFPO0lBQ1gsQ0FBQztDQUNKO0FBckRELDhCQXFEQyJ9