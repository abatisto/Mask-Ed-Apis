import { IFieldConfig, IRawTransformConfig } from "./classes/ObfuscationTransform";
export declare function previewTransformsHandler(value: string, transforms: IRawTransformConfig[]): string;
export declare function runTransformPipelineHandler(filePath: string, newFilename: string, fieldConfigs: IFieldConfig[]): Promise<void>;
