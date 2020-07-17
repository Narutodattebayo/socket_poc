"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANT = {
    PASSWORD_HASH_SALT: "JBDuwwuhd232QYWBXSKHCNKWBwgyew87635",
    EMAIL_TEMPLATES: process.cwd() + `/src/Mailer/`,
    ASSETS_PATH: process.env + "./asset",
    MIN_EVENT_START_TIME: new Date(new Date().getTime() + 55 * 60 * 1000).toISOString(),
    MIN_EVENT_DURATION: 30,
    OTP_EXPIRY_LIMIT: 30 * 60 * 1000,
    FALLBACK: "http://google.com",
    IOS_LINK: "rev://com.rev/",
    IOS_STORE_LINK: "com.rev.beta/",
    ANDROID_LINK: "rev://com.rev/",
    ANDROID_PACKAGE_NAME: "com.rev.beta",
    BASIC_USER_CARS_LIMIT: 1,
    BASIC_USER_IMAGE_LIMIT: 9,
    ELITE_USER_CARS_LIMIT: 1000000,
    ELITE_USER_IMAGE_LIMIT: 16,
    MAP_VIEW_EVENTS_DISTANCE: 25 * 1000
};
//# sourceMappingURL=constant.common.js.map