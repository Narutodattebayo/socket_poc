"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const _baseRoute_1 = __importDefault(require("@baseRoute"));
const _common_1 = require("@common");
const _controllers_1 = require("@controllers");
const _middlewares_1 = __importDefault(require("@middlewares"));
class V1UserRouteClass extends _baseRoute_1.default {
    constructor(path) {
        super();
        this.path = path;
        this.initRoutes();
    }
    get instance() {
        return this.router;
    }
    initRoutes() {
        this.router.post('/signup', celebrate_1.celebrate({
            body: {
                name: _common_1.VALIDATION.USER.NAME.required(),
                email: _common_1.VALIDATION.USER.EMAIL.required(),
                password: _common_1.VALIDATION.USER.PASSWORD,
                image: _common_1.VALIDATION.USER.IMAGE.allow(null, ""),
            }
        }), (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.userSignUp(req, res, next);
        });
        this.router.post('/verifyOtp', celebrate_1.celebrate({
            body: {
                otp: _common_1.VALIDATION.USER.OTP.required(),
                email: _common_1.VALIDATION.USER.EMAIL.required(),
            }
        }), (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.verifyOtp(req, res, next);
        });
        this.router.post('/login', celebrate_1.celebrate({
            body: {
                email: _common_1.VALIDATION.USER.EMAIL.required(),
                password: _common_1.VALIDATION.USER.PASSWORD.required(),
            }
        }), (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.userLogin(req, res, next);
        });
        this.router.get('/logout', _middlewares_1.default.VerifyUserSession, (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.logout(req, res, next);
        });
        this.router.get('/pendingMessages', _middlewares_1.default.VerifyUserSession, (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.myPendingMessages(req, res, next);
        });
        this.router.get('/allUsers', celebrate_1.celebrate({
            query: Object.assign({}, _common_1.VALIDATION.GENERAL.PAGINATION)
        }), _middlewares_1.default.VerifyUserSession, (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.allUsers(req, res, next);
        });
        this.router.get('/allChats', celebrate_1.celebrate({
            query: Object.assign({}, _common_1.VALIDATION.GENERAL.PAGINATION)
        }), _middlewares_1.default.VerifyUserSession, (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.allChats(req, res, next);
        });
        this.router.get('/createGroup', celebrate_1.celebrate({
            query: {
                name: celebrate_1.Joi.string().min(1).required()
            }
        }), _middlewares_1.default.VerifyUserSession, (req, res, next) => {
            console.log('in Route');
            _controllers_1.UserController.newGroup(req, res, next);
        });
    }
}
exports.default = new V1UserRouteClass('/');
//# sourceMappingURL=user.routes.js.map