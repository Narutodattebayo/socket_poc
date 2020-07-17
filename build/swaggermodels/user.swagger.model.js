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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_express_ts_1 = require("swagger-express-ts");
let ReqAddUserModel = class ReqAddUserModel {
};
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "name of user",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Anil'
    }),
    __metadata("design:type", String)
], ReqAddUserModel.prototype, "name", void 0);
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "email of user",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'abc@yopmail.com'
    }),
    __metadata("design:type", String)
], ReqAddUserModel.prototype, "email", void 0);
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "password",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '12345678'
    }),
    __metadata("design:type", String)
], ReqAddUserModel.prototype, "password", void 0);
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "image url",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit-640x354.jpg'
    }),
    __metadata("design:type", String)
], ReqAddUserModel.prototype, "image", void 0);
ReqAddUserModel = __decorate([
    swagger_express_ts_1.ApiModel({
        description: "User Add",
        name: "ReqAddUser"
    })
], ReqAddUserModel);
exports.ReqAddUserModel = ReqAddUserModel;
let ReqUserVerifyOtpModel = class ReqUserVerifyOtpModel {
};
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "email of user",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'abc@yopmail.com'
    }),
    __metadata("design:type", String)
], ReqUserVerifyOtpModel.prototype, "email", void 0);
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "otp",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '1234'
    }),
    __metadata("design:type", String)
], ReqUserVerifyOtpModel.prototype, "otp", void 0);
ReqUserVerifyOtpModel = __decorate([
    swagger_express_ts_1.ApiModel({
        description: "User Add",
        name: "ReqUserVerifyOtp"
    })
], ReqUserVerifyOtpModel);
exports.ReqUserVerifyOtpModel = ReqUserVerifyOtpModel;
let ReqUserLoginModel = class ReqUserLoginModel {
};
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "email of user",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'abc@yopmail.com'
    }),
    __metadata("design:type", String)
], ReqUserLoginModel.prototype, "email", void 0);
__decorate([
    swagger_express_ts_1.ApiModelProperty({
        description: "password",
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Password'
    }),
    __metadata("design:type", String)
], ReqUserLoginModel.prototype, "password", void 0);
ReqUserLoginModel = __decorate([
    swagger_express_ts_1.ApiModel({
        description: "User Add",
        name: "ReqUserLogin"
    })
], ReqUserLoginModel);
exports.ReqUserLoginModel = ReqUserLoginModel;
//# sourceMappingURL=user.swagger.model.js.map