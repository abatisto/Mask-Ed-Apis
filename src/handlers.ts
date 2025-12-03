import { ITransform, getCorrectTransform } from "./classes/ObfuscationTransform";
import { CSVParser } from "./classes/CSVParser";
import { Transform } from "stream";

export function previewTransformsHandler(value: string, transforms: string[]): string {

    let newValue = value;
    transforms.forEach(t => {
        let transformClass: ITransform = getCorrectTransform(t);
        newValue = new transformClass().apply(newValue);
    })

    return newValue
}

export async function runTransformPipelineHandler(filename:string, newFilename, transforms:string[]) {
    let streamTransforms: Transform[] = [];
    transforms.forEach(t => {
        let tc:ITransform = getCorrectTransform(t);
        streamTransforms.push(tc.getTransform());
    })

    let csvParser = new CSVParser(filename);
    await csvParser.runTransformPipeline(streamTransforms, newFilename);

}