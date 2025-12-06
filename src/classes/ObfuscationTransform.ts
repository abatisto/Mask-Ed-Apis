import { Transform, TransformCallback } from "stream";
import moment, { Moment } from "moment";

abstract class ObfuscationTransform {
    public static readonly transformId: number;
    public static readonly transformName: string;
    public static readonly transformDescription: string;

    public targetField:string;

    public readonly params: any; 

    public abstract apply(value: string | null): string | null;

    constructor(targetField:string, params?) {
        this.targetField = targetField;
        this.params = params;
    }

    public getTransform(): Transform {
        let t = new Transform();
        t._transform = (objString: any, encoding:BufferEncoding, callback: TransformCallback) => {
            let obj = JSON.parse(objString);
            if(!obj[this.targetField]) obj[this.targetField] = "";
            // handle conditions here

            obj[this.targetField] = this.apply(obj[this.targetField]);
            if(obj[this.targetField].includes(",")) {
                obj[this.targetField] = `"${obj[this.targetField].replace(/"/g, '')}"`
            }
            callback(null, JSON.stringify(obj))
        }
        return t;
    }


}


class HashTransform extends ObfuscationTransform {
    public static readonly transformId = 0;
    public static readonly transformName = "Hash";

    public apply(value) {
        const crypto =  require('crypto');
        return crypto.createHash('md5').update(value).digest("hex");
    }
}

class TruncateTransform extends ObfuscationTransform {
    public static readonly transformId = 1;
    public static readonly transformName = "Truncate";

    public apply(value) {
        const numChars = this.params?.numChars ?? 5;
        return value.substring(0, numChars);
    }
}

class ClearValueTransform extends ObfuscationTransform {
    public static readonly transformId = 2;
    public static readonly transformName = "Clear Value";
    public apply(value) {
        return "";
    }
}

class RandomizeDate extends ObfuscationTransform {
    public static readonly transformId = 3;
    public static readonly transformName = "Randomize Date";
    public apply(value) {
        const m = moment(value);

        const targetFormat = this.params?.targetFormat ?? "MM/DD/YYYY";
        const minNumDays = 1;
        const maxNumDays = this.params?.maxNumDays ?? 10;
        const numOfDays = Math.floor(Math.random() * (maxNumDays - minNumDays + 1)) + minNumDays;

        const addOrSubtract = Math.random() > 0.5 ? "add" : "subtract";

        return m[addOrSubtract](numOfDays, "days").format(targetFormat);


    }
}

class HidePhoneNumberTransform extends ObfuscationTransform {
    public static readonly transformId = 4;
    public static readonly transformName = "Hide Phone Number";

    public apply(value: string) {
        const replaceChar = this.params?.replaceChar ?? "X";
        let leftNum = this.params?.leftNum ?? 0;
        let rightNum = this.params?.rightNum ?? 0;

        if (!value) return value;

        const chars = value.split("");

        for (let i = 0; i < chars.length && leftNum > 0; i++) {
            if (/\d/.test(chars[i])) {
                chars[i] = replaceChar;
                leftNum--;
            }
        }

        for (let i = chars.length - 1; i >= 0 && rightNum > 0; i--) {
            if (/\d/.test(chars[i])) {
                chars[i] = replaceChar;
                rightNum--;
            }
        }

        return chars.join("");
    }
}

class DateToYear extends ObfuscationTransform {
    public static readonly transformId = 5;
    public static readonly transformName = "Date To Year";

    public apply(value) {
        return moment(value).format("YYYY");
    }
}

class Replace extends ObfuscationTransform {
    public static readonly transformId = 6;
    public static readonly transformName = "Replace";

    public apply(value: string) {
        const toReplace = this.params?.toReplace ?? "";
        const replaceWith = this.params?.replaceWith ?? "";
        return value.replace(toReplace, replaceWith)
    }
}

class StripRight extends ObfuscationTransform {
    public static readonly transformId = 7;
    public static readonly transformName = "Strip Right";

    public apply(value: string) {
        const target = this.params?.target ?? "";
        const numChars = this.params?.numChars ?? "";


        const index = value.indexOf(target);

        if (index === -1) {
            return value;
        }

        const end = index + target.length + numChars;

        return value.slice(0, index) + value.slice(end);
    }
}

class StripLeft extends ObfuscationTransform {
    public static readonly transformId = 8;
    public static readonly transformName = "Strip Left";

    public apply(value: string) {
        const target = this.params?.target ?? "";
        const numChars = this.params?.numChars ?? "";

        const index = value.indexOf(target);

        if (index === -1) {
            return value;
        }

        const start = Math.max(0, index - numChars);

        return value.slice(0, start) + value.slice(index);
    }
}




interface ITransform {
    transformId:number;
    transformName:string;
    transformDescription:string;
    apply(value:string):string;
    // getTransform():Transform;
    new(targetField:string,params?:any);
}

interface IFieldConfig {
    fieldName:string,
    transforms:IRawTransformConfig[]
}

interface IRawTransformConfig {
    name:string,
    params?:any
}

function getCorrectTransform(transformName:string): ITransform {
    let foundTransform: ITransform;
    allTransforms.forEach(t => {
        if(t.transformName === transformName) foundTransform = t;
    })
    return foundTransform;
}

const allTransforms:ITransform[] = [HashTransform, TruncateTransform, ClearValueTransform, RandomizeDate, HidePhoneNumberTransform, DateToYear]

export {
    TruncateTransform, HashTransform, ClearValueTransform, RandomizeDate, HidePhoneNumberTransform,DateToYear,
    ITransform, IFieldConfig,
    getCorrectTransform
}