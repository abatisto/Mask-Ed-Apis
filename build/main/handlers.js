"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewTransformsHandler = previewTransformsHandler;
exports.runTransformPipelineHandler = runTransformPipelineHandler;
const ObfuscationTransform_1 = require("./classes/ObfuscationTransform");
const CSVParser_1 = require("./classes/CSVParser");
function previewTransformsHandler(value, transforms) {
    let newValue = value;
    transforms.forEach(t => {
        let transformClass = (0, ObfuscationTransform_1.getCorrectTransform)(t);
        newValue = new transformClass(null).apply(newValue);
    });
    return newValue;
}
async function runTransformPipelineHandler(filename, newFilename, fieldConfigs) {
    let streamTransforms = [];
    fieldConfigs.forEach(fc => {
        fc.transforms.forEach(t => {
            console.log(t);
            let tc = (0, ObfuscationTransform_1.getCorrectTransform)(t.name);
            console.log(t.params);
            streamTransforms.push(new tc(fc.fieldName, t.params).getTransform());
        });
    });
    let csvParser = new CSVParser_1.CSVParser(filename);
    await csvParser.runTransformPipeline(streamTransforms, newFilename);
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSw0REFTQztBQUVELGtFQWNDO0FBN0JELHlFQUErRjtBQUMvRixtREFBZ0Q7QUFHaEQsU0FBZ0Isd0JBQXdCLENBQUMsS0FBYSxFQUFFLFVBQW9CO0lBRXhFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25CLElBQUksY0FBYyxHQUFlLElBQUEsMENBQW1CLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sUUFBUSxDQUFBO0FBQ25CLENBQUM7QUFFTSxLQUFLLFVBQVUsMkJBQTJCLENBQUMsUUFBZSxFQUFFLFdBQWtCLEVBQUUsWUFBMkI7SUFDOUcsSUFBSSxnQkFBZ0IsR0FBZ0IsRUFBRSxDQUFDO0lBQ3ZDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDdEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNkLElBQUksRUFBRSxHQUFjLElBQUEsMENBQW1CLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsTUFBTSxTQUFTLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDcEUsT0FBTztBQUNYLENBQUMifQ==