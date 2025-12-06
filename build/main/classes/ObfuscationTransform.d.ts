/// <reference types="node" />
import { Transform } from "stream";
declare abstract class ObfuscationTransform {
    static readonly transformId: number;
    static readonly transformName: string;
    static readonly transformDescription: string;
    targetField: string;
    readonly params: any;
    abstract apply(value: string | null): string | null;
    constructor(targetField: string, params?: any);
    getTransform(): Transform;
}
declare class HashTransform extends ObfuscationTransform {
    static readonly transformId = 0;
    static readonly transformName = "Hash";
    apply(value: any): any;
}
declare class TruncateTransform extends ObfuscationTransform {
    static readonly transformId = 1;
    static readonly transformName = "Truncate";
    apply(value: any): any;
}
declare class ClearValueTransform extends ObfuscationTransform {
    static readonly transformId = 2;
    static readonly transformName = "Clear Value";
    apply(value: any): string;
}
declare class RandomizeDate extends ObfuscationTransform {
    static readonly transformId = 3;
    static readonly transformName = "Randomize Date";
    apply(value: any): string;
}
declare class HidePhoneNumberTransform extends ObfuscationTransform {
    static readonly transformId = 4;
    static readonly transformName = "Hide Phone Number";
    apply(value: string): string;
}
declare class DateToYear extends ObfuscationTransform {
    static readonly transformId = 5;
    static readonly transformName = "Date To Year";
    apply(value: any): string;
}
interface ITransform {
    transformId: number;
    transformName: string;
    transformDescription: string;
    apply(value: string): string;
    new (targetField: string, params?: any): any;
}
interface IFieldConfig {
    fieldName: string;
    transforms: IRawTransformConfig[];
}
interface IRawTransformConfig {
    name: string;
    params?: any;
}
declare function getCorrectTransform(transformName: string): ITransform;
export { TruncateTransform, HashTransform, ClearValueTransform, RandomizeDate, HidePhoneNumberTransform, DateToYear, ITransform, IFieldConfig, getCorrectTransform };
