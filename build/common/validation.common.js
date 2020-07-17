"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const enum_common_1 = require("./enum.common");
exports.VALIDATION = {
    ADMIN: {
        ID: celebrate_1.Joi.string().regex(/^[a-f\d]{24}$/i),
        EMAIL: celebrate_1.Joi.string().trim().email(),
        PASSWORD: celebrate_1.Joi.string().min(6).max(32),
        NAME: celebrate_1.Joi.string().trim().min(2).max(40),
        PROFILE_PHOTO: celebrate_1.Joi.string().trim().uri(),
        META_TOKEN: celebrate_1.Joi.string()
    },
    NOTIFICATION: {
        ID: celebrate_1.Joi.string().regex(/^[a-f\d]{24}$/i).required(),
        ID_OPTIONAL: celebrate_1.Joi.string().regex(/^[a-f\d]{24}$/i),
    },
    USER: {
        NAME: celebrate_1.Joi.string().min(3).max(40),
        EMAIL: celebrate_1.Joi.string().trim().email().max(40),
        PASSWORD: celebrate_1.Joi.string().min(8).max(15),
        COUNTRY_CODE: celebrate_1.Joi.string().allow("", null),
        PHONE: celebrate_1.Joi.string().min(8).max(15).allow("", null),
        IMAGE: celebrate_1.Joi.string().allow("", null),
        OTP: celebrate_1.Joi.string(),
        DEVICE: celebrate_1.Joi.object().keys({
            platform: celebrate_1.Joi.string(),
            token: celebrate_1.Joi.string()
        }),
        RESET_TOKEN: celebrate_1.Joi.string(),
        SOCIAL_LOGIN_TYPE: celebrate_1.Joi.string().required().valid(enum_common_1.ENUM_ARRAY.SOCIAL_LOGIN_TYPE.PLATFORM),
        SOCIAL_ID: celebrate_1.Joi.string().required(),
        STATUS: celebrate_1.Joi.string(),
        SORT: celebrate_1.Joi.string().valid(enum_common_1.ENUM_ARRAY.SORT_BY),
        ID: celebrate_1.Joi.string().regex(/^[a-f\d]{24}$/i),
        TYPE: celebrate_1.Joi.string().optional().valid(enum_common_1.ENUM_ARRAY.USER.TYPE),
        CITY: celebrate_1.Joi.string().allow(null, ""),
        BIO: celebrate_1.Joi.string().allow(null, "").optional().max(50),
        GENDER: celebrate_1.Joi.string().optional().valid(enum_common_1.ENUM_ARRAY.USER.GENDER),
        LATITUDE: celebrate_1.Joi.number().min(-90).max(90),
        LONGITUDE: celebrate_1.Joi.number().min(-180).max(180),
    },
    HISTORY: {
        SEARCH_TYPE: celebrate_1.Joi.string().required().valid('event', 'user'),
        ID: celebrate_1.Joi.string().regex(/^[a-f\d]{24}$/i),
    },
    GENERAL: {
        ANY: celebrate_1.Joi.any(),
        BOOLEAN: celebrate_1.Joi.boolean(),
        STRING: celebrate_1.Joi.string(),
        PAGINATION: {
            page: celebrate_1.Joi.number().min(1).required(),
            limit: celebrate_1.Joi.number().min(3).max(100).default(10).optional(),
            search: celebrate_1.Joi.string().trim().optional(),
        },
        NUMBER: celebrate_1.Joi.number(),
        REF: (key) => celebrate_1.Joi.ref(key)
    },
    FILTER: {
        KEY: celebrate_1.Joi.array().items(celebrate_1.Joi.string().valid(enum_common_1.ENUM_ARRAY.FILTERBY.KEYS))
    },
    SORT: {
        KEY: celebrate_1.Joi.string().valid(enum_common_1.ENUM_ARRAY.SORT_BY.KEYS)
    },
};
//# sourceMappingURL=validation.common.js.map