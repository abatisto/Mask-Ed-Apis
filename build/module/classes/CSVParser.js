import * as fs from "fs";
import { pipeline } from "stream/promises";
import * as c2j from "csvtojson";
export class CSVParser {
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
        await pipeline([
            srcStream,
            c2j.csv(),
            ...transforms,
            destStream
        ]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1NWUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsYXNzZXMvQ1NWUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBR3pCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEtBQUssR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUdqQyxNQUFNLE9BQU8sU0FBUztJQUdsQixZQUFZLFFBQWdCO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFTSxXQUFXO1FBQ2QsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDM0IsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLFVBQXVCLEVBQUUsWUFBb0I7UUFDM0UsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFJcEQsTUFBTSxRQUFRLENBQUM7WUFDWCxTQUFTO1lBQ1QsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNULEdBQUcsVUFBVTtZQUNiLFVBQVU7U0FDYixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0oifQ==