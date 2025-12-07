"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripRight = exports.StripLeft = exports.Replace = exports.DateToYear = exports.HidePhoneNumberTransform = exports.RandomizeDate = exports.ClearValueTransform = exports.HashTransform = exports.TruncateTransform = void 0;
exports.getCorrectTransform = getCorrectTransform;
const stream_1 = require("stream");
const moment_1 = __importDefault(require("moment"));
class ObfuscationTransform {
    constructor(targetField, params) {
        this.targetField = targetField;
        this.params = params;
    }
    getTransform() {
        let t = new stream_1.Transform();
        t._transform = (objString, _encoding, callback) => {
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
        value = "";
        return value;
        ;
    }
}
exports.ClearValueTransform = ClearValueTransform;
ClearValueTransform.transformId = 2;
ClearValueTransform.transformName = "Clear Value";
class RandomizeDate extends ObfuscationTransform {
    apply(value) {
        var _a, _b, _c, _d;
        const m = (0, moment_1.default)(value);
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
        return (0, moment_1.default)(value).format("YYYY");
    }
}
exports.DateToYear = DateToYear;
DateToYear.transformId = 5;
DateToYear.transformName = "Date to Year";
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
const allTransforms = [HashTransform, TruncateTransform, ClearValueTransform, RandomizeDate, HidePhoneNumberTransform, DateToYear, Replace, StripLeft, StripRight];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JmdXNjYXRpb25UcmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xhc3Nlcy9PYmZ1c2NhdGlvblRyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUF1Tkksa0RBQW1CO0FBdk52QixtQ0FBc0Q7QUFDdEQsb0RBQTRCO0FBRTVCLE1BQWUsb0JBQW9CO0lBWS9CLFlBQVksV0FBa0IsRUFBRSxNQUFPO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLFNBQWMsRUFBRSxTQUF3QixFQUFFLFFBQTJCLEVBQUUsRUFBRTtZQUNyRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0RCx5QkFBeUI7WUFFekIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FB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