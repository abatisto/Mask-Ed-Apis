declare abstract class ObfuscationTransform {
    static readonly transformId: number;
    static readonly transformName: string;
    static readonly transformDescription: string;
    readonly params: any;
    abstract apply(value: string | null): string | null;
    constructor(params?: any);
}
declare class HashTransform extends ObfuscationTransform {
    apply(value: any): any;
}
declare class TruncateTransform extends ObfuscationTransform {
    apply(value: any): any;
}
declare class ClearValueTransform extends ObfuscationTransform {
    apply(value: any): string;
}
interface ITransform {
    transformId: number;
    transformName: string;
    transformDescription: string;
    apply(value: string): string;
    new (params?: any): ObfuscationTransform;
}
declare function getCorrectTransform(transformName: string): ITransform;
export { TruncateTransform, HashTransform, ClearValueTransform, ITransform, getCorrectTransform };
