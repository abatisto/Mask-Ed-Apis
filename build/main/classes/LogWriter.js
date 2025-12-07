"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogWriter = void 0;
const fs_1 = require("fs");
class LogWriter {
    constructor(filename) {
        this.filename = filename;
        (0, fs_1.writeFileSync)(filename, "");
    }
    writeLine(text) {
        (0, fs_1.appendFileSync)(this.filename, text + "\n");
    }
}
exports.LogWriter = LogWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsYXNzZXMvTG9nV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUFtRDtBQUVuRCxNQUFhLFNBQVM7SUFHbEIsWUFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFBLGtCQUFhLEVBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHTSxTQUFTLENBQUMsSUFBWTtRQUN6QixJQUFBLG1CQUFjLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBWkQsOEJBWUMifQ==