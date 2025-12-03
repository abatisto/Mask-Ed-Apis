class ObfuscationTransform {
    constructor(params) {
        this.params = params;
    }
}
class HashTransform extends ObfuscationTransform {
    apply(value) {
        const crypto = require('crypto');
        return crypto.createHash('md5').update(value).digest("hex");
    }
}
class TruncateTransform extends ObfuscationTransform {
    apply(value) {
        return value.substring(0, this.params.numChars);
    }
}
class ClearValueTransform extends ObfuscationTransform {
    apply(value) {
        return "";
    }
}
function getCorrectTransform(transformName) {
    allTransforms.forEach(t => {
        if (t.transformName === transformName)
            return t;
    });
    return null;
}
const allTransforms = [HashTransform, TruncateTransform, ClearValueTransform];
export { TruncateTransform, HashTransform, ClearValueTransform, getCorrectTransform };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JmdXNjYXRpb25UcmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xhc3Nlcy9PYmZ1c2NhdGlvblRyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFlLG9CQUFvQjtJQVMvQixZQUFZLE1BQU87UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFHRCxNQUFNLGFBQWMsU0FBUSxvQkFBb0I7SUFDckMsS0FBSyxDQUFDLEtBQUs7UUFDZCxNQUFNLE1BQU0sR0FBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBRUQsTUFBTSxpQkFBa0IsU0FBUSxvQkFBb0I7SUFDekMsS0FBSyxDQUFDLEtBQUs7UUFDZCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKO0FBRUQsTUFBTSxtQkFBb0IsU0FBUSxvQkFBb0I7SUFDM0MsS0FBSyxDQUFDLEtBQUs7UUFDZCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQVVELFNBQVMsbUJBQW1CLENBQUMsYUFBb0I7SUFDN0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QixJQUFHLENBQUMsQ0FBQyxhQUFhLEtBQUssYUFBYTtZQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUE7QUFFN0UsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBYyxtQkFBbUIsRUFBQyxDQUFBIn0=