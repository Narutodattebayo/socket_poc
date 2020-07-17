"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
exports.SYS_ERR = {
    NODE_ENV_INVALID: 100,
    BOOTSTRAP_ERROR: 101,
    MONGO_CONN_FAILED: 103
};
if (typeof process.env.NODE_ENV === 'undefined')
    process.exit(exports.SYS_ERR.NODE_ENV_INVALID);
dotenv_1.default.config({ path: `bin/.env.${process.env.NODE_ENV}` });
exports.CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
    APP_PORT: process.env.PORT,
    SOCKET_PORT: process.env.SOCKET_PORT,
    DB_POOLSIZE: 50,
    JWT_PASSWORD: 'qwerty',
    SYS_EMAIL: process.env.SYS_EMAIL,
    SYS_PASSWORD: process.env.SYS_PASSWORD,
    FCM_PHOTOLOOT_JSON: 'bin/photoloot.json',
    AWS: {
        BUCKET: process.env.AWS_BUCKET,
        ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        SECRET_KEY: process.env.AWS_SECRET_KEY,
        REGION: process.env.AWS_REGION,
        BASE_URL: process.env.AWS_URL + process.env.AWS_BUCKET + '/'
    },
    SNS: {
        ACCESS_KEY: process.env.SNS_ACCESS_KEY_ID,
        SECRET_KEY: process.env.SNS_SECRET_ACCESS_KEY,
        REGION: process.env.SNS_REGION
    },
    FCM: {
        SERVER_KEY: process.env.FCM_SERVER_KEY
    }
};
exports.BASE = {
    URL: process.env.BASE_URL,
    ADMIN: process.env.BASE_ADMIN_URL,
    AWS: {
        IMAGE_PATH: 'desk_new/images/',
        AR_MODEL_PATH: 'desk_new/models/',
    },
    ANDROID: process.env.ANDROID_URL
};
//# sourceMappingURL=config.common.js.map