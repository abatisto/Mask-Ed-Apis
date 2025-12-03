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
        let srcStream = fs.createReadStream(this.filename);
        let destStream = fs.createWriteStream(destFileName);
        await promises_1.pipeline([
            srcStream,
            c2j.csv(),
            ...transforms,
            destStream
        ]);
    }
}
exports.CSVParser = CSVParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1NWUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsYXNzZXMvQ1NWUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFHekIsOENBQTJDO0FBQzNDLCtDQUFpQztBQUdqQyxNQUFhLFNBQVM7SUFHbEIsWUFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRU0sV0FBVztRQUNkLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzNCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxVQUF1QixFQUFFLFlBQW9CO1FBQzNFLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSXBELE1BQU0sbUJBQVEsQ0FBQztZQUNYLFNBQVM7WUFDVCxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1QsR0FBRyxVQUFVO1lBQ2IsVUFBVTtTQUNiLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTdCRCw4QkE2QkMifQ==