"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_response_1 = __importDefault(require("./user.response"));
const admin_response_1 = __importDefault(require("./admin.response"));
exports.SUCCESS = {
    DEFAULT: {
        httpCode: 200,
        statusCode: 200,
        message: 'Success'
    },
    CAR_EDIT: {
        httpCode: 200,
        statusCode: 200,
        message: 'Car details updated successfully'
    }
};
exports.CUSTOM_ERROR = (data, message) => {
    return ({
        httpCode: 400,
        statusCode: 400,
        message: message ? message : "Success",
        data: data ? data : {}
    });
};
exports.RESPONSE = {
    ADMIN: admin_response_1.default,
    USER: user_response_1.default
};
//# sourceMappingURL=index.js.map