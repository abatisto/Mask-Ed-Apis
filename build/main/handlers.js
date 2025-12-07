"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewTransformsHandler = previewTransformsHandler;
exports.runTransformPipelineHandler = runTransformPipelineHandler;
const ObfuscationTransform_1 = require("./classes/ObfuscationTransform");
const CSVParser_1 = require("./classes/CSVParser");
const LogWriter_1 = require("./classes/LogWriter");
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
function previewTransformsHandler(value, transforms) {
    let newValue = value;
    transforms.forEach(t => {
        let transformClass = (0, ObfuscationTransform_1.getCorrectTransform)(t.name);
        newValue = new transformClass(null, t.params).apply(newValue);
    });
    return newValue;
}
async function runTransformPipelineHandler(filePath, newFilename, fieldConfigs) {
    const startTime = (0, moment_1.default)();
    const log = new LogWriter_1.LogWriter(path.join("logs", path.basename(filePath)));
    log.writeLine(`Running Transform Pipeline from ${path.basename(filePath)} to ${newFilename} applying transform(s)`);
    let streamTransforms = [];
    fieldConfigs.forEach(fc => {
        fc.transforms.forEach(t => {
            log.writeLine(`Running transform '${t.name}' ${t.params ? ("with " + JSON.stringify(t.params)) : ""} on ${fc.fieldName}`);
            let tc = (0, ObfuscationTransform_1.getCorrectTransform)(t.name);
            streamTransforms.push(new tc(fc.fieldName, t.params).getTransform());
        });
    });
    let csvParser = new CSVParser_1.CSVParser(filePath);
    try {
        await csvParser.runTransformPipeline(streamTransforms, newFilename);
    }
    catch (e) {
        log.writeLine(`FATAL ERROR: ${e}`);
        throw e;
    }
    const endTime = (0, moment_1.default)();
    let elapsedTime = endTime.diff(startTime);
    log.writeLine(`Process finished in ${elapsedTime} MS`);
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSw0REFRQztBQUVELGtFQXlCQztBQTFDRCx5RUFBb0g7QUFDcEgsbURBQWdEO0FBRWhELG1EQUFnRDtBQUNoRCwyQ0FBNkI7QUFDN0Isb0RBQTRCO0FBRTVCLFNBQWdCLHdCQUF3QixDQUFDLEtBQWEsRUFBRSxVQUFpQztJQUNyRixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixJQUFJLGNBQWMsR0FBZSxJQUFBLDBDQUFtQixFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLFFBQVEsQ0FBQTtBQUNuQixDQUFDO0FBRU0sS0FBSyxVQUFVLDJCQUEyQixDQUFDLFFBQWUsRUFBRSxXQUFrQixFQUFFLFlBQTJCO0lBQzlHLE1BQU0sU0FBUyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0lBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxHQUFHLENBQUMsU0FBUyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLFdBQVcsd0JBQXdCLENBQUMsQ0FBQTtJQUVuSCxJQUFJLGdCQUFnQixHQUFnQixFQUFFLENBQUM7SUFDdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUN0QixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4SCxJQUFJLEVBQUUsR0FBYyxJQUFBLDBDQUFtQixFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQztRQUNELE1BQU0sU0FBUyxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFBQSxPQUFNLENBQUMsRUFBQyxDQUFDO1FBQ04sR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsQyxNQUFNLENBQUMsQ0FBQztJQUNaLENBQUM7SUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztJQUN6QixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLEdBQUcsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLFdBQVcsS0FBSyxDQUFDLENBQUE7SUFDdEQsT0FBTztBQUNYLENBQUMifQ==