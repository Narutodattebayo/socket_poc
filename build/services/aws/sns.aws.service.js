"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const _common_1 = require("@common");
class SnsServiceClass {
    constructor() {
        this.sns = new aws_sdk_1.SNS({
            accessKeyId: _common_1.CONFIG.SNS.ACCESS_KEY,
            secretAccessKey: _common_1.CONFIG.SNS.SECRET_KEY
        });
    }
    async sendSms(phone, OTP) {
        this.sns.publish({
            Message: `Your OTP Is ${OTP}`,
            Subject: "REV Signup",
            PhoneNumber: phone
        }, (err, data) => {
            if (err)
                console.log(err);
            console.log(data);
        });
    }
}
exports.SnsService = new SnsServiceClass();
//# sourceMappingURL=sns.aws.service.js.map