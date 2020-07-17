"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const common_1 = require("../common");
class MailerClass {
    constructor(senderName) {
        this.sender = `${senderName}<${common_1.CONFIG.SYS_EMAIL}>`;
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: common_1.CONFIG.SYS_EMAIL,
                pass: common_1.CONFIG.SYS_PASSWORD
            },
        });
    }
    async sendMail(mailOptions) {
        if (!mailOptions.to)
            Promise.reject('Email reciever not provided in the mailer options');
        if (!mailOptions.subject)
            Promise.reject('Email subject not provided in the mailer options');
        if (!mailOptions.text && !mailOptions.html)
            Promise.reject('Email content not provided in the mailer options');
        mailOptions['from'] = this.sender;
        if (process.env.NODE_ENV !== '_development') {
            let emailSentResponse = await this.transporter.sendMail(mailOptions);
            if (emailSentResponse) {
                console.log(`EMAIL [messageId: ${emailSentResponse.messageId}] TO [recieptens: ${emailSentResponse.envelope.to}]`);
                return true;
            }
            else
                return false;
        }
        else
            return true;
    }
}
exports.Mailer = new MailerClass('Desk Now Support');
//# sourceMappingURL=mailer.service.js.map