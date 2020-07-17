"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const handlebar = __importStar(require("handlebars"));
exports.TEMPLATER = {
    makeHtmlTemplate: async function (source, data) {
        return new Promise((resolve, reject) => {
            fs.readFile(source, 'utf8', (err, content) => {
                if (err) {
                    console.log('Error in side makeHtmlTemplate', err);
                    reject(err);
                }
                try {
                    let template = handlebar.compile(content, { noEscape: true });
                    let html = template(data);
                    resolve(html);
                }
                catch (error) {
                    reject(err);
                }
            });
        });
    }
};
//# sourceMappingURL=htmlHelper.js.map