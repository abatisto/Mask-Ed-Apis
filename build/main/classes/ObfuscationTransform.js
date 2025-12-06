"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrectTransform = exports.StripRight = exports.StripLeft = exports.Replace = exports.DateToYear = exports.HidePhoneNumberTransform = exports.RandomizeDate = exports.ClearValueTransform = exports.HashTransform = exports.TruncateTransform = void 0;
const stream_1 = require("stream");
const moment_1 = __importDefault(require("moment"));
class ObfuscationTransform {
    constructor(targetField, params) {
        this.targetField = targetField;
        this.params = params;
    }
    getTransform() {
        let t = new stream_1.Transform();
        t._transform = (objString, encoding, callback) => {
            let obj = JSON.parse(objString);
            if (!obj[this.targetField])
                obj[this.targetField] = "";
            // handle conditions here
            obj[this.targetField] = this.apply(obj[this.targetField]);
            if (obj[this.targetField].includes(",")) {
                obj[this.targetField] = `"${obj[this.targetField].replace(/"/g, '')}"`;
            }
            callback(null, JSON.stringify(obj));
        };
        return t;
    }
}
class HashTransform extends ObfuscationTransform {
    apply(value) {
        const crypto = require('crypto');
        return crypto.createHash('md5').update(value).digest("hex");
    }
}
exports.HashTransform = HashTransform;
HashTransform.transformId = 0;
HashTransform.transformName = "Hash";
class TruncateTransform extends ObfuscationTransform {
    apply(value) {
        var _a, _b;
        const numChars = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.numChars) !== null && _b !== void 0 ? _b : 5;
        return value.substring(0, numChars);
    }
}
exports.TruncateTransform = TruncateTransform;
TruncateTransform.transformId = 1;
TruncateTransform.transformName = "Truncate";
class ClearValueTransform extends ObfuscationTransform {
    apply(value) {
        return "";
    }
}
exports.ClearValueTransform = ClearValueTransform;
ClearValueTransform.transformId = 2;
ClearValueTransform.transformName = "Clear Value";
class RandomizeDate extends ObfuscationTransform {
    apply(value) {
        var _a, _b, _c, _d;
        const m = moment_1.default(value);
        const targetFormat = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.targetFormat) !== null && _b !== void 0 ? _b : "MM/DD/YYYY";
        const minNumDays = 1;
        const maxNumDays = (_d = (_c = this.params) === null || _c === void 0 ? void 0 : _c.maxNumDays) !== null && _d !== void 0 ? _d : 10;
        const numOfDays = Math.floor(Math.random() * (maxNumDays - minNumDays + 1)) + minNumDays;
        const addOrSubtract = Math.random() > 0.5 ? "add" : "subtract";
        return m[addOrSubtract](numOfDays, "days").format(targetFormat);
    }
}
exports.RandomizeDate = RandomizeDate;
RandomizeDate.transformId = 3;
RandomizeDate.transformName = "Randomize Date";
class HidePhoneNumberTransform extends ObfuscationTransform {
    apply(value) {
        var _a, _b, _c, _d, _e, _f;
        const replaceChar = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.replaceChar) !== null && _b !== void 0 ? _b : "X";
        let leftNum = (_d = (_c = this.params) === null || _c === void 0 ? void 0 : _c.leftNum) !== null && _d !== void 0 ? _d : 0;
        let rightNum = (_f = (_e = this.params) === null || _e === void 0 ? void 0 : _e.rightNum) !== null && _f !== void 0 ? _f : 0;
        if (!value)
            return value;
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
exports.HidePhoneNumberTransform = HidePhoneNumberTransform;
HidePhoneNumberTransform.transformId = 4;
HidePhoneNumberTransform.transformName = "Hide Phone Number";
class DateToYear extends ObfuscationTransform {
    apply(value) {
        return moment_1.default(value).format("YYYY");
    }
}
exports.DateToYear = DateToYear;
DateToYear.transformId = 5;
DateToYear.transformName = "Date To Year";
class Replace extends ObfuscationTransform {
    apply(value) {
        var _a, _b, _c, _d;
        const toReplace = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.toReplace) !== null && _b !== void 0 ? _b : "";
        const replaceWith = (_d = (_c = this.params) === null || _c === void 0 ? void 0 : _c.replaceWith) !== null && _d !== void 0 ? _d : "";
        return value.replace(toReplace, replaceWith);
    }
}
exports.Replace = Replace;
Replace.transformId = 6;
Replace.transformName = "Replace";
class StripRight extends ObfuscationTransform {
    apply(value) {
        var _a, _b, _c, _d;
        const target = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.target) !== null && _b !== void 0 ? _b : "";
        const numChars = (_d = (_c = this.params) === null || _c === void 0 ? void 0 : _c.numChars) !== null && _d !== void 0 ? _d : "";
        const index = value.indexOf(target);
        if (index === -1) {
            return value;
        }
        const end = index + target.length + numChars;
        return value.slice(0, index) + value.slice(end);
    }
}
exports.StripRight = StripRight;
StripRight.transformId = 7;
StripRight.transformName = "Strip Right";
class StripLeft extends ObfuscationTransform {
    apply(value) {
        var _a, _b, _c, _d;
        const target = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.target) !== null && _b !== void 0 ? _b : "";
        const numChars = (_d = (_c = this.params) === null || _c === void 0 ? void 0 : _c.numChars) !== null && _d !== void 0 ? _d : "";
        const index = value.indexOf(target);
        if (index === -1) {
            return value;
        }
        const start = Math.max(0, index - numChars);
        return value.slice(0, start) + value.slice(index);
    }
}
exports.StripLeft = StripLeft;
StripLeft.transformId = 8;
StripLeft.transformName = "Strip Left";
function getCorrectTransform(transformName) {
    let foundTransform;
    allTransforms.forEach(t => {
        if (t.transformName === transformName)
            foundTransform = t;
    });
    return foundTransform;
}
exports.getCorrectTransform = getCorrectTransform;
const allTransforms = [HashTransform, TruncateTransform, ClearValueTransform, RandomizeDate, HidePhoneNumberTransform, DateToYear, Replace, StripLeft, StripRight];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JmdXNjYXRpb25UcmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xhc3Nlcy9PYmZ1c2NhdGlvblRyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtQ0FBc0Q7QUFDdEQsb0RBQXdDO0FBRXhDLE1BQWUsb0JBQW9CO0lBVy9CLFlBQVksV0FBa0IsRUFBRSxNQUFPO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLFNBQWMsRUFBRSxRQUF1QixFQUFFLFFBQTJCLEVBQUUsRUFBRTtZQUNwRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0RCx5QkFBeUI7WUFFekIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUE7YUFDekU7WUFDRCxRQUFRLENB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