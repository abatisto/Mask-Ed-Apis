"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrectTransform = exports.ClearValueTransform = exports.HashTransform = exports.TruncateTransform = void 0;
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
exports.HashTransform = HashTransform;
class TruncateTransform extends ObfuscationTransform {
    apply(value) {
        return value.substring(0, this.params.numChars);
    }
}
exports.TruncateTransform = TruncateTransform;
class ClearValueTransform extends ObfuscationTransform {
    apply(value) {
        return "";
    }
}
exports.ClearValueTransform = ClearValueTransform;
function getCorrectTransform(transformName) {
    allTransforms.forEach(t => {
        if (t.transformName === transformName)
            return t;
    });
    return null;
}
exports.getCorrectTransform = getCorrectTransform;
const allTransforms = [HashTransform, TruncateTransform, ClearValueTransform];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JmdXNjYXRpb25UcmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xhc3Nlcy9PYmZ1c2NhdGlvblRyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxNQUFlLG9CQUFvQjtJQVMvQixZQUFZLE1BQU87UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFHRCxNQUFNLGFBQWMsU0FBUSxvQkFBb0I7SUFDckMsS0FBSyxDQUFDLEtBQUs7UUFDZCxNQUFNLE1BQU0sR0FBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBK0IwQixzQ0FBYTtBQTdCeEMsTUFBTSxpQkFBa0IsU0FBUSxvQkFBb0I7SUFDekMsS0FBSyxDQUFDLEtBQUs7UUFDZCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKO0FBeUJPLDhDQUFpQjtBQXZCekIsTUFBTSxtQkFBb0IsU0FBUSxvQkFBb0I7SUFDM0MsS0FBSyxDQUFDLEtBQUs7UUFDZCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQW1CeUMsa0RBQW1CO0FBVDdELFNBQVMsbUJBQW1CLENBQUMsYUFBb0I7SUFDN0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QixJQUFHLENBQUMsQ0FBQyxhQUFhLEtBQUssYUFBYTtZQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUkwRSxrREFBbUI7QUFGOUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQSJ9