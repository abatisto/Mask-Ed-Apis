import { appendFileSync, writeFileSync } from "fs";

export class LogWriter {
    public filename: string;

    constructor(filename: string) {
        this.filename = filename;
        writeFileSync(filename, "");
    }


    public writeLine(text: string): void {
        appendFileSync(this.filename, text + "\n");
    }
}