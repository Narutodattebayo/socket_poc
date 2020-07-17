"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const _routes_1 = __importDefault(require("@routes"));
const _common_1 = require("@common");
const _middlewares_1 = __importDefault(require("@middlewares"));
const _services_1 = require("@services");
const swagger = __importStar(require("swagger-express-ts"));
require("reflect-metadata");
const swagger_express_ts_1 = require("swagger-express-ts");
const bootstraps_1 = require("./services/bootstraps");
const swaggermodel = __importStar(require("./swaggermodels/"));
exports.swaggermodel = swaggermodel;
const commonRoutes = __importStar(require("./routes/common.routes"));
class Application {
    constructor() {
        this.app = express_1.default();
        this.init();
    }
    get instance() {
        return this.app;
    }
    async init() {
        _services_1.mongoDOA.connectDatabase(_common_1.CONFIG.DB_URI);
        bootstraps_1.bootstrapStatus.createAdmin;
        this.useMiddlewares();
        this.useRoutes();
    }
    useMiddlewares() {
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.set('views', express_1.default.static(process.cwd() + '/views'));
        console.log((process.cwd() + '/views'));
        this.app.set('view engine', 'hbs');
        this.app.use('/api-docs/swagger', express_1.default.static('swagger'));
        this.app.use('/api-docs/swagger/assets', express_1.default.static('node_modules/swagger-ui-dist'));
        this.app.use(express_1.default.static(process.cwd() + "/asset"));
        this.app.use((request, response, next) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(swagger.express({
            definition: {
                info: {
                    title: "Socket ",
                    version: "1.0",
                },
                securityDefinitions: {
                    apiKeyHeader: {
                        type: swagger_express_ts_1.SwaggerDefinitionConstant.Security.Type.API_KEY,
                        in: swagger_express_ts_1.SwaggerDefinitionConstant.Security.In.HEADER,
                        name: "Authorization"
                    }
                }
            }
        }));
    }
    useRoutes() {
        this.app.use(commonRoutes.default.path, commonRoutes.default.instance);
        this.app.use(_routes_1.default.path, _routes_1.default.instance);
        this.app.use(_middlewares_1.default.InvalidRoute);
        this.app.use(_middlewares_1.default.ErrorHandler);
    }
}
exports.default = new Application();
//# sourceMappingURL=app.js.map