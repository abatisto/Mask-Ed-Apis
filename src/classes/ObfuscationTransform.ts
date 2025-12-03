import { Transform, TransformCallback } from "stream";
import moment, { Moment } from "moment";

abstract class ObfuscationTransform {
    public static readonly transformId: number;
    public static readonly transformName: string;
    public static readonly transformDescription: string;

    public targetField:string;

    public readonly params: any; 

    public abstract apply(value: string | null): string | null;

    constructor(params?) {
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
    public apply(value) {
        const crypto =  require('crypto');
        return crypto.createHash('md5').update(value).digest("hex");
    }
}

class TruncateTransform extends ObfuscationTransform {
    public apply(value) {
        return value.substring(0, this.params.numChars);
    }
}

class ClearValueTransform extends ObfuscationTransform {
    public apply(value) {
        return "";
    }
}

class RandomizeDate extends ObfuscationTransform {
    public apply(value) {
        const minNumDays:number = 1;
        let maxNumDays:number = this.params.maxNumDays || 10;
        let numOfDays:number = Math.floor(Math.random() * (maxNumDays - minNumDays + 1)) + minNumDays;
        let addOrSubtract:number = Math.random();

        if(addOrSubtract === 1) {
            return moment(value).add(numOfDays, "days").format()
        }else{
            return moment(value).subtract(numOfDays, "days").format()
        }

    }
}

interface ITransform {
    transformId:number,
    transformName:string,
    transformDescription:string,
    apply(value:string):string,
    getTransform():Transform,
    new(params?:any):ObfuscationTransform
}

function getCorrectTransform(transformName:string): ITransform {
    allTransforms.forEach(t => {
        if(t.transformName === transformName) return t;
    })
    return null;
}

const allTransforms = [HashTransform, TruncateTransform, ClearValueTransform, RandomizeDate]

export {
    TruncateTransform, HashTransform, ClearValueTransform, RandomizeDate, 
    ITransform, 
    getCorrectTransform
}