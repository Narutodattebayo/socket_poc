"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_express_ts_1 = require("swagger-express-ts");
const _baseController_1 = __importDefault(require("@baseController"));
const htmlHelper_1 = require("../htmlHelper");
const constant_common_1 = require("../common/constant.common");
let CommonClass = class CommonClass extends _baseController_1.default {
    constructor() {
        super();
    }
    async deeplinkingEventShare(req, res, next) {
        try {
            let eventId = req.params.eventId;
            let url = constant_common_1.CONSTANT.ANDROID_LINK + `?viewId=1&eventId=${eventId}`;
            let ios_store_link = constant_common_1.CONSTANT.IOS_STORE_LINK + `?viewId=1&eventId=${eventId}`;
            let iosLink = constant_common_1.CONSTANT.IOS_LINK + `?viewId=1&eventId=${eventId}`;
            let obj = {
                fallback: constant_common_1.CONSTANT.FALLBACK,
                url: url,
                android_package_name: constant_common_1.CONSTANT.ANDROID_PACKAGE_NAME,
                ios_store_link: ios_store_link,
                iosLink: iosLink
            };
            let html = await htmlHelper_1.TEMPLATER.makeHtmlTemplate(`${constant_common_1.CONSTANT.EMAIL_TEMPLATES}/staticpage.html`, obj);
            console.log();
            return this.sendhtml(res, html);
        }
        catch (err) {
            next(err);
        }
    }
};
CommonClass = __decorate([
    swagger_express_ts_1.ApiPath({
        path: "/",
        name: "Common",
        security: { apiKeyHeader: [] },
    }),
    __metadata("design:paramtypes", [])
], CommonClass);
exports.CommonController = new CommonClass();
//# sourceMappingURL=common.controller.js.map