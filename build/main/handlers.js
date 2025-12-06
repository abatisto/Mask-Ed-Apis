"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTransformPipelineHandler = exports.previewTransformsHandler = void 0;
const ObfuscationTransform_1 = require("./classes/ObfuscationTransform");
const CSVParser_1 = require("./classes/CSVParser");
function previewTransformsHandler(value, transforms) {
    let newValue = value;
    transforms.forEach(t => {
        let transformClass = ObfuscationTransform_1.getCorrectTransform(t);
        newValue = new transformClass(null).apply(newValue);
    });
    return newValue;
}
exports.previewTransformsHandler = previewTransformsHandler;
async function runTransformPipelineHandler(filename, newFilename, fieldConfigs) {
    let streamTransforms = [];
    fieldConfigs.forEach(fc => {
        fc.transforms.forEach(t => {
            console.log(t);
            let tc = ObfuscationTransform_1.getCorrectTransform(t.name);
            console.log(t.params);
            streamTransforms.push(new tc(fc.fieldName, t.params).getTransform());
        });
    });
    let csvParser = new CSVParser_1.CSVParser(filename);
    await csvParser.runTransformPipeline(streamTransforms, newFilename);
    return;
}
exports.runTransformPipelineHandler = runTransformPipelineHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQStGO0FBQy9GLG1EQUFnRDtBQUdoRCxTQUFnQix3QkFBd0IsQ0FBQyxLQUFhLEVBQUUsVUFBb0I7SUFFeEUsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbkIsSUFBSSxjQUFjLEdBQWUsMENBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sUUFBUSxDQUFBO0FBQ25CLENBQUM7QUFURCw0REFTQztBQUVNLEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxRQUFlLEVBQUUsV0FBa0IsRUFBRSxZQUEyQjtJQUM5RyxJQUFJLGdCQUFnQixHQUFnQixFQUFFLENBQUM7SUFDdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUN0QixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2QsSUFBSSxFQUFFLEdBQWMsMENBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsTUFBTSxTQUFTLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDcEUsT0FBTztBQUNYLENBQUM7QUFkRCxrRUFjQyJ9