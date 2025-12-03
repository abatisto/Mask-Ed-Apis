/// <reference types="node" />
import { Transform } from "stream";
export declare class CSVParser {
    filename: string;
    constructor(filename: string);
    getFileInfo(): string[];
    runTransformPipeline(transforms: Transform[], destFileName: string): Promise<void>;
}
