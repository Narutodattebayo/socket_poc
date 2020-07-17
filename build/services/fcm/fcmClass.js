"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fcm = require('fcm-node');
const config_common_1 = require("../../common/config.common");
class fcmService {
    constructor() {
        this.serverKey = config_common_1.CONFIG.FCM.SERVER_KEY;
        this.FCM = new fcm(this.serverKey);
    }
    async sendNotification(tokens) {
        let message = {
            to: tokens,
            collapse_key: 'your_collapse_key',
            notification: {
                title: 'Title of your push notification',
                body: 'Body of your push notification'
            },
            data: {
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };
        this.FCM.send(message);
    }
}
exports.Mailer = new fcmService();
//# sourceMappingURL=fcmClass.js.map