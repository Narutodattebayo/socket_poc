"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_response_1 = __importDefault(require("./code.response"));
const MSG = {
    EN: {
        NOT_FOUND: 'Admin not found',
        EMAIL_NOT_EXISTS: `Couldn't find your account`,
        INCORRECT_PASSWORD: ' Password is incorrect',
        INCORRECT_OLD_PASSWORD: 'Old Password is incorrect',
        TOKEN_EXPIRED: 'This link has been expired',
        TOKEN_INCORRECT: 'This link has been expired',
        EMAIL_SENT: 'Reset password email sent successfully',
        USER_ADDED: "User added successfully",
        USER_UPDATED: "User updated successfully",
        EVENT_NOT_FOUND: "Event not found",
        EVENT_DELETED_SUCCESSFULLY: "Event deleted sucessfully",
        EVENT_UPDATED_SUCCESSFULLY: "Event updated successfully",
        EVENT_STATUS_UPDATED: "Event status updated successfully",
        CAR_UPDATED: "Car updated successfully",
        CAR_NOT_FOUND: "Car not found",
        CAR_DELETED: "Car deleted successfully"
    }
};
exports.default = (lang) => ({
    NOT_FOUND: { httpCode: code_response_1.default.NOT_FOUND, statusCode: 1001, message: MSG[lang].NOT_FOUND },
    EMAIL_NOT_EXISTS: { httpCode: code_response_1.default.NOT_FOUND, statusCode: 404, message: MSG[lang].EMAIL_NOT_EXISTS },
    INCORRECT_PASSWORD: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 400, message: MSG[lang].INCORRECT_PASSWORD },
    INCORRECT_OLD_PASSWORD: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 400, message: MSG[lang].INCORRECT_OLD_PASSWORD },
    TOKEN_EXPIRED: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 1028, message: MSG[lang].TOKEN_EXPIRED },
    TOKEN_INCORRECT: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 1029, message: MSG[lang].TOKEN_INCORRECT },
    EMAIL_SENT: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].EMAIL_SENT },
    USER_ADDED: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].USER_ADDED },
    USER_UPDATED: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].USER_UPDATED },
    EVENT_NOT_FOUND: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 400, message: MSG[lang].EVENT_NOT_FOUND },
    EVENT_DELETED_SUCCESSFULLY: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].EVENT_DELETED_SUCCESSFULLY },
    EVENT_UPDATED_SUCCESSFULLY: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].EVENT_UPDATED_SUCCESSFULLY },
    EVENT_STATUS_UPDATED: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].EVENT_UPDATED_SUCCESSFULLY },
    CAR_UPDATED: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].CAR_UPDATED },
    CAR_DELETED: { httpCode: code_response_1.default.SUCCESS, statusCode: 200, message: MSG[lang].CAR_DELETED },
    CAR_NOT_FOUND: { httpCode: code_response_1.default.BAD_REQUEST, statusCode: 400, message: MSG[lang].CAR_NOT_FOUND },
});
//# sourceMappingURL=admin.response.js.map