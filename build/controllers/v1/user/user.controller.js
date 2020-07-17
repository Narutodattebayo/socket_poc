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
const base_controller_1 = __importDefault(require("../../base.controller"));
const swagger_express_ts_1 = require("swagger-express-ts");
const common_1 = require("../../../common");
const _entity_1 = require("@entity");
const services_1 = require("../../../services");
const constant_common_1 = require("../../../common/constant.common");
const _builders_1 = __importDefault(require("@builders"));
let UserClass = class UserClass extends base_controller_1.default {
    constructor() {
        super();
    }
    async userSignUp(req, res, next) {
        try {
            let payload = req.body;
            let existingEmail = await _entity_1.UserV1.findOne({ email: payload.email });
            if (!existingEmail) {
                payload.otp = 1234;
                _entity_1.UserV1.createUser(payload);
                return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).SIGNUP_SUCCESSFULLY);
            }
            else
                return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).EMAIL_ALREADY_EXISTS);
        }
        catch (err) {
            next(err);
        }
    }
    async verifyOtp(req, res, next) {
        try {
            let payload = req.body;
            let existingEmail = await _entity_1.UserV1.findOne({ email: payload.email });
            if (existingEmail) {
                if (existingEmail.otp == payload.otp || payload.otp == 1234) {
                    _entity_1.UserV1.updateDocument({ _id: existingEmail._id }, { emailVerified: true });
                    let userSession = await _entity_1.UserV1.createNewSession({ userId: existingEmail._id });
                    console.log(userSession, "??????????????????");
                    let token = await services_1.Auth.generateUserJWT(userSession._id);
                    existingEmail.authToken = token;
                    return this.sendResponse(res, common_1.SUCCESS.DEFAULT, existingEmail);
                }
                else
                    return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).INVALID_OTP);
            }
            else
                return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).NOT_FOUND);
        }
        catch (err) {
            next(err);
        }
    }
    async userLogin(req, res, next) {
        try {
            let payload = req.body;
            let existingEmail = await _entity_1.UserV1.findOne({ email: payload.email });
            if (existingEmail) {
                if (existingEmail.emailVerified) {
                    if (existingEmail.password == services_1.Auth.hashData(payload.password, constant_common_1.CONSTANT.PASSWORD_HASH_SALT)) {
                        let userSession = await _entity_1.UserV1.createNewSession({ userId: existingEmail._id });
                        let token = await services_1.Auth.generateUserJWT(userSession._id);
                        existingEmail.authToken = token;
                        return this.sendResponse(res, common_1.SUCCESS.DEFAULT, existingEmail);
                    }
                    else
                        return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).INVALID_CREDENTIALS);
                }
                else
                    return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).EMAIL_NOT_VERIFIED);
            }
            else
                return this.sendResponse(res, common_1.RESPONSE.USER(res.locals.lang).NOT_FOUND);
        }
        catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            await _entity_1.UserV1.removeSession(res.locals.userSessionId);
            return this.sendResponse(res, common_1.SUCCESS.DEFAULT);
        }
        catch (err) {
            next(err);
        }
    }
    async myPendingMessages(req, res, next) {
        try {
            let pipeline = _builders_1.default.User.Chat.PendingMessages(res.locals.userId);
            let chat = _entity_1.chatV1.basicAggregate(pipeline);
            return this.sendResponse(res, common_1.SUCCESS.DEFAULT, chat);
        }
        catch (err) {
            next(err);
        }
    }
    async allUsers(req, res, next) {
        try {
            let payload = req.query;
            let pipeline = _builders_1.default.User.Chat.userList(res.locals.userId, payload);
            payload.getCount = true;
            let users = await _entity_1.UserV1.paginateAggregate(pipeline, payload);
            return this.sendResponse(res, common_1.SUCCESS.DEFAULT, users);
        }
        catch (err) {
            next(err);
        }
    }
    async allChats(req, res, next) {
        try {
            let payload = req.query;
            let pipeline = _builders_1.default.User.Chat.chatList(res.locals.userId);
            payload.getCount = true;
            let users = await _entity_1.chatV1.basicAggregate(pipeline);
            return this.sendResponse(res, common_1.SUCCESS.DEFAULT, users);
        }
        catch (err) {
            next(err);
        }
    }
    async newGroup(req, res, next) {
        try {
            let payload = req.query;
            payload.admins = [res.locals.userId];
            payload.members = [res.locals.userId];
            payload.creator = res.locals.userId;
            _entity_1.groupV1.createGroup(payload);
            return this.sendResponse(res, common_1.SUCCESS.DEFAULT);
        }
        catch (err) {
            next(err);
        }
    }
};
__decorate([
    swagger_express_ts_1.ApiOperationPost({
        description: "User SignUp",
        path: '/signup',
        parameters: {
            body: {
                description: 'Body for signup',
                required: true,
                model: 'ReqAddUser'
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserClass.prototype, "userSignUp", null);
__decorate([
    swagger_express_ts_1.ApiOperationPost({
        description: "User verify otp",
        path: '/verifyOtp',
        parameters: {
            body: {
                description: 'Body for verify otp',
                required: true,
                model: 'ReqUserVerifyOtp'
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserClass.prototype, "verifyOtp", null);
__decorate([
    swagger_express_ts_1.ApiOperationPost({
        description: "User login",
        path: '/login',
        parameters: {
            body: {
                description: 'Body for login',
                required: true,
                model: 'ReqUserLogin'
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserClass.prototype, "userLogin", null);
UserClass = __decorate([
    swagger_express_ts_1.ApiPath({
        path: "/api/v1/user",
        name: "User Onboarding Module",
        security: { apiKeyHeader: [] },
    }),
    __metadata("design:paramtypes", [])
], UserClass);
exports.UserController = new UserClass();
//# sourceMappingURL=user.controller.js.map