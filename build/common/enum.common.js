"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM = {
    LOGIN_TYPE: {
        FACEBOOK: "facebook",
        GOOGLE: "google",
        APPLE: "apple"
    },
    ADMIN: {
        TYPE: { SUPER_ADMIN: 'super', SUB_ADMIN: 'sub' },
        DEVICE_PLATFORM: { WEB: 'web' },
        VALUE: 'ADMIN'
    },
    USER: {
        STATUS: { ACTIVE: 'active', BLOCK: 'block' },
        TYPE: { BASIC: 'basic', ELITE: 'elite' },
        GENDER: { MALE: 'male', FEMALE: 'female', OTHER: 'other' }
    },
    USER_SESSION: {
        PLATFORM: { IOS: 'ios', ANDROID: 'android' }
    },
    COL: {
        ADMIN: 'admins',
        ADMIN_SESSION: 'admin_sessions',
        USER_SESSION: 'user_session',
        USER: 'users',
        CHAT: "chat",
        GROUP: "groups"
    },
    REDIS: {
        KEY: {},
    },
    FILTER_BY: {
        KEYS: {
            ACTIVE: "active",
            INACTIVE: "inactive",
        }
    },
    SORT_BY: {
        KEYS: {
            NAME: "name",
            CREATEDAT: "createdAt"
        }
    },
    MEDIA_TYPE: {
        KEYS: {
            IMAGE: "image",
            VIDEO: "video"
        }
    },
};
exports.ENUM_ARRAY = {
    ADMIN: {
        TYPE: Object.values(exports.ENUM.ADMIN.TYPE),
        DEVICE_PLATFORM: Object.values(exports.ENUM.ADMIN.DEVICE_PLATFORM),
    },
    USER: {
        STATUS: Object.values(exports.ENUM.USER.STATUS),
        TYPE: Object.values(exports.ENUM.USER.TYPE),
        GENDER: Object.values(exports.ENUM.USER.GENDER)
    },
    USER_SESSION: {
        PLATFORM: Object.values(exports.ENUM.USER_SESSION.PLATFORM)
    },
    SOCIAL_LOGIN_TYPE: {
        PLATFORM: Object.values(exports.ENUM.LOGIN_TYPE)
    },
    FILTERBY: {
        KEYS: Object.values(exports.ENUM.FILTER_BY.KEYS)
    },
    SORT_BY: {
        KEYS: Object.values(exports.ENUM.SORT_BY.KEYS)
    },
    MEDIA_TYPE: {
        KEYS: Object.values(exports.ENUM.MEDIA_TYPE.KEYS)
    }
};
//# sourceMappingURL=enum.common.js.map