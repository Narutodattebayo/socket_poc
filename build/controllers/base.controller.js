"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseClass {
    constructor() { }
    async sendResponse(r, b, d = {}) {
        b.data = d;
        r.status(b.httpCode).json(b);
    }
    async errorResponse(res, err) {
        console.log("ERROR : ", err);
        res.status(400).send({ success: false, message: err.message || err, statusCode: 400 });
    }
    async sendhtml(response, html) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        return response.end(html, 'utf-8');
    }
}
exports.default = BaseClass;
//# sourceMappingURL=base.controller.js.map