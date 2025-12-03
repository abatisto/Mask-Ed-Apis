"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewTransformsHandler = void 0;
const ObfuscationTransform_1 = require("./classes/ObfuscationTransform");
function previewTransformsHandler(value, transforms) {
    let newValue = value;
    transforms.forEach(t => {
        let transformClass = ObfuscationTransform_1.getCorrectTransform(t);
        newValue = new transformClass().apply(newValue);
    });
    return newValue;
}
exports.previewTransformsHandler = previewTransformsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQWlGO0FBRWpGLFNBQWdCLHdCQUF3QixDQUFDLEtBQWEsRUFBRSxVQUFvQjtJQUV4RSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixJQUFJLGNBQWMsR0FBZSwwQ0FBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxRQUFRLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLFFBQVEsQ0FBQTtBQUNuQixDQUFDO0FBVEQsNERBU0MifQ==