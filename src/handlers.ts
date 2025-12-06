import { ITransform, getCorrectTransform, IFieldConfig } from "./classes/ObfuscationTransform";
import { CSVParser } from "./classes/CSVParser";
import { Transform } from "stream";

export function previewTransformsHandler(value: string, transforms: string[]): string {

    let newValue = value;
    transforms.forEach(t => {
        let transformClass: ITransform = getCorrectTransform(t);
        newValue = new transformClass(null).apply(newValue);
    })

    return newValue
}

export async function runTransformPipelineHandler(filename:string, newFilename:string, fieldConfigs:IFieldConfig[]) {
    let streamTransforms: Transform[] = [];
    fieldConfigs.forEach(fc => {
        fc.transforms.forEach(t => {
            console.log(t)
            let tc:ITransform = getCorrectTransform(t.name);
            console.log(t.params)
            streamTransforms.push(new tc(fc.fieldName,t.params).getTransform());
        })
    })

    let csvParser = new CSVParser(filename);
    await csvParser.runTransformPipeline(streamTransforms, newFilename);
    return;
}