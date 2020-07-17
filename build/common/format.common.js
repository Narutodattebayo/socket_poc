"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_common_1 = require("./config.common");
const EMAIL = {
    ADMIN: {
        PASSWORD_CHANGE: (reciever) => ({
            to: reciever,
            subject: 'Password Change Successful',
            text: 'You have successfully changed your password.'
        }),
        FORGOT_PASSWORD: (reciever, payload) => ({
            to: reciever,
            subject: 'Forgot Password',
            html: `Hello, <br/><br/>Please click on this link to reset your password: <a href="${config_common_1.BASE.ADMIN}/account/reset-password/${payload.metaToken.value}">here</a>`
        }),
        FORGOT_PASSWORD_NEW: (reciever, html) => ({
            to: reciever,
            subject: 'Forgot Password',
            html: html
        }),
        RESET_PASSWORD: (reciever) => ({
            to: reciever,
            subject: 'Password Reset Successful',
            text: `You have successfully resetted your password.`
        }),
        USER_CREDENTIALS: (reciever, password) => ({
            to: reciever,
            subject: 'Password Reset Successful',
            html: `Hello, <br/><br/>You have been onboarded to Desk Now.<br/><br/>
            Your Credentials are<br/><br/></b>Email:${reciever}<br/><br/>Password:${password}`
        }),
    },
    USER: {
        FORGOT_PASSWORD: (reciever, html) => ({
            to: reciever,
            subject: 'Forgot Password',
            html: html
        }),
        SIGNUP_OTP: (reciever, payload) => ({
            to: reciever,
            subject: 'User SignUp',
            html: `Hello, <br/><br/>Your one time passcode is: ${payload.otp}`
        }),
        NEW_SIGNUP_OTP: (reciever, html) => ({
            to: reciever,
            subject: 'User SignUp',
            html: html
        }),
    }
};
exports.FORMAT = {
    EMAIL
};
//# sourceMappingURL=format.common.js.map