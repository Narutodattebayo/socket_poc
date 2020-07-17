"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const base_routes_1 = __importDefault(require("./base.routes"));
class Routes extends base_routes_1.default {
    constructor() {
        super();
        this.path = '/api';
        this.init();
    }
    get instance() {
        return this.router;
    }
    init() {
        this.router.use(user_1.default.path, user_1.default.instance);
    }
}
exports.default = new Routes();
//# sourceMappingURL=index.js.map