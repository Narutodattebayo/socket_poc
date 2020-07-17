"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _baseRoute_1 = __importDefault(require("@baseRoute"));
const user_routes_1 = __importDefault(require("./user.routes"));
class v1AppRoutes extends _baseRoute_1.default {
    constructor() {
        super();
        this.path = '/v1/user';
        this.init();
    }
    get instance() {
        return this.router;
    }
    routeMiddlewares() {
        this.router.use('/', (req, res, next) => {
            console.log(`\n========================= NEW REQUEST -> ${req.method} ${req.originalUrl}`);
            console.log(req.body);
            console.log(`\n=========================`);
            res.locals.lang = req.headers.lang || 'EN';
            next();
        });
    }
    init() {
        this.routeMiddlewares();
        this.router.use(user_routes_1.default.path, user_routes_1.default.instance);
    }
}
exports.default = new v1AppRoutes();
//# sourceMappingURL=index.js.map