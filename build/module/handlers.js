import { getCorrectTransform } from "./classes/ObfuscationTransform";
export function previewTransformsHandler(value, transforms) {
    let newValue = value;
    transforms.forEach(t => {
        let transformClass = getCorrectTransform(t);
        newValue = new transformClass().apply(newValue);
    });
    return newValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFakYsTUFBTSxVQUFVLHdCQUF3QixDQUFDLEtBQWEsRUFBRSxVQUFvQjtJQUV4RSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixJQUFJLGNBQWMsR0FBZSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxRQUFRLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLFFBQVEsQ0FBQTtBQUNuQixDQUFDIn0=