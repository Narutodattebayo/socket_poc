"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_response_1 = __importDefault(require("./code.response"));
exports.MSG = {
    EN: {
        NOT_FOUND: 'User not found',
        SIGNUP_SUCCESSFULLY: "Signup successfully, One time passcode sent to your email id .",
        EMAIL_ALREADY_EXISTS: "Email already exists",
        INVALID_OTP: "Otp is invalid",
        EMAIL_NOT_VERIFIED: "Please verify your email",
        INVALID_CREDENTIALS: "Invalid credentials"
    },
    FR: {
        SIGNUP_SUCCESSFULLY: `inscription réussie`,
    }
};
exports.default = (lang) => ({
    SIGNUP_SUCCESSFULLY: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: exports.MSG[lang].SIGNUP_SUCCESSFULLY },
    EMAIL_ALREADY_EXISTS: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 400, message: exports.MSG[lang].EMAIL_ALREADY_EXISTS },
    INVALID_OTP: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 400, message: exports.MSG[lang].INVALID_OTP },
    NOT_FOUND: { httpCode: code_response_1.default.NOT_FOUND, statusCode: 404, message: exports.MSG[lang].NOT_FOUND },
    EMAIL_NOT_VERIFIED: { httpCode: code_response_1.default.NOT_FOUND, statusCode: 400, message: exports.MSG[lang].EMAIL_NOT_VERIFIED },
    INVALID_CREDENTIALS: { httpCode: code_response_1.default.NOT_FOUND, statusCode: 400, message: exports.MSG[lang].INVALID_CREDENTIALS },
});
exports.CUSTOM_SUCCESS = (data, message) => {
    return ({
        httpCode: 200,
        statusCode: 200,
        message: message ? message : "Success",
        data: data ? data : {}
    });
};
exports.CUSTOM_ERROR = (data, message) => {
    return ({
        httpCode: 400,
        statusCode: 400,
        message: message ? message : "Success",
        data: data ? data : {}
    });
};
//# sourceMappingURL=user.response.js.map