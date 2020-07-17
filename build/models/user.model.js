"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
const userSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.Schema.Types.String, },
    email: { type: mongoose_1.Schema.Types.String },
    password: { type: mongoose_1.Schema.Types.String },
    countryCode: { type: mongoose_1.Schema.Types.String },
    phoneNo: { type: mongoose_1.Schema.Types.String },
    otp: { type: mongoose_1.Schema.Types.Number },
    otpExpiry: { type: mongoose_1.Schema.Types.Date },
    status: { type: mongoose_1.Schema.Types.String, enum: common_1.ENUM_ARRAY.USER.STATUS, default: common_1.ENUM.USER.STATUS.ACTIVE },
    userType: { type: mongoose_1.Schema.Types.String, enum: common_1.ENUM_ARRAY.USER.TYPE, default: common_1.ENUM.USER.TYPE.BASIC },
    image: { type: mongoose_1.Schema.Types.String, default: "" },
    city: { type: mongoose_1.Schema.Types.String, default: "" },
    phoneVerified: { type: mongoose_1.Schema.Types.Boolean, default: false },
    isDelete: { type: mongoose_1.Schema.Types.Boolean, default: false },
    emailVerified: { type: mongoose_1.Schema.Types.Boolean, default: false },
    resetToken: { type: mongoose_1.Schema.Types.String },
    googleId: { type: mongoose_1.Schema.Types.String },
    facebookId: { type: mongoose_1.Schema.Types.String },
    lastSeen: { type: mongoose_1.Schema.Types.Date },
    isOnline: { type: mongoose_1.Schema.Types.Boolean, default: false }
}, {
    versionKey: false,
    collection: common_1.ENUM.COL.USER,
    timestamps: true
});
exports.default = mongoose_1.model(common_1.ENUM.COL.USER, userSchema);
//# sourceMappingURL=user.model.js.map