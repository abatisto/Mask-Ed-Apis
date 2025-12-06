import { IFieldConfig } from "./classes/ObfuscationTransform";
export declare function previewTransformsHandler(value: string, transforms: string[]): string;
export declare function runTransformPipelineHandler(filename: string, newFilename: string, fieldConfigs: IFieldConfig[]): Promise<void>;
