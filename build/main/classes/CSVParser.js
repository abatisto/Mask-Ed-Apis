"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
            .on('data', () => {
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
        await (0, promises_1.pipeline)([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1NWUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsYXNzZXMvQ1NWUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QjtBQUV6Qiw4Q0FBMkM7QUFDM0MsK0NBQWlDO0FBQ2pDLHFEQUF1QztBQUV2QyxNQUFhLFNBQVM7SUFHbEIsWUFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRU0sV0FBVztRQUNkLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzNCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxVQUF1QixFQUFFLFlBQW9CO1FBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLElBQUksQ0FBQyxRQUFRLE9BQU8sWUFBWSxhQUFhLFVBQVUsQ0FBQyxNQUFNLGVBQWUsQ0FBQyxDQUFBO1FBQzdILElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVqQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUE7UUFDdkUsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVWLFFBQVE7YUFDSCxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNiLENBQUMsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUE7UUFFTixVQUFVO2FBQ0wsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDZixJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUMsQ0FBQztnQkFDTixJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUMsTUFBTSxDQUFBO2dCQUM5RCxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFTixNQUFNLElBQUEsbUJBQVEsRUFBQztZQUNYLFNBQVM7WUFDVCxRQUFRO1lBQ1IsR0FBRyxVQUFVO1lBQ2IsUUFBUTtZQUNSLFVBQVU7U0FDYixDQUFDLENBQUE7UUFFRixPQUFPO0lBQ1gsQ0FBQztDQUNKO0FBckRELDhCQXFEQyJ9