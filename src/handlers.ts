import { ITransform, getCorrectTransform, IFieldConfig, IRawTransformConfig } from "./classes/ObfuscationTransform";
import { CSVParser } from "./classes/CSVParser";
import { Transform } from "stream";
import { LogWriter } from "./classes/LogWriter";
import * as path from "path";
import moment from "moment";

export function previewTransformsHandler(value: string, transforms: IRawTransformConfig[]): string {
    let newValue = value;
    transforms.forEach(t => {
        let transformClass: ITransform = getCorrectTransform(t.name);
        newValue = new transformClass(null, t.params).apply(newValue);
    })

    return newValue
}

export async function runTransformPipelineHandler(filePath:string, newFilename:string, fieldConfigs:IFieldConfig[]) {
    const startTime = moment();
    const log = new LogWriter(path.join("logs",path.basename(filePath)));
    log.writeLine(`Running Transform Pipeline from ${path.basename(filePath)} to ${newFilename} applying transform(s)`)

    let streamTransforms: Transform[] = [];
    fieldConfigs.forEach(fc => {
        fc.transforms.forEach(t => {
            log.writeLine(`Running transform '${t.name}' ${t.params ? ("with "+JSON.stringify(t.params)) : ""} on ${fc.fieldName}`);
            let tc:ITransform = getCorrectTransform(t.name);
            streamTransforms.push(new tc(fc.fieldName,t.params).getTransform());
        })
    })

    let csvParser = new CSVParser(filePath);
    try {
        await csvParser.runTransformPipeline(streamTransforms, newFilename);
    }catch(e){
        log.writeLine(`FATAL ERROR: ${e}`)
        throw e;
    }
    const endTime = moment();
    let elapsedTime = endTime.diff(startTime)
    log.writeLine(`Process finished in ${elapsedTime} MS`)
    return;
}