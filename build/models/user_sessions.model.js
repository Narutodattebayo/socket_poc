"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
const userSessionSchema = new mongoose_1.Schema({
    "userId": { type: mongoose_1.SchemaTypes.ObjectId, required: true },
    "device": {
        "id": { type: mongoose_1.SchemaTypes.String, trim: true },
        "name": { type: mongoose_1.SchemaTypes.String, trim: true },
        "platform": {
            type: mongoose_1.SchemaTypes.String,
            enum: common_1.ENUM_ARRAY.USER_SESSION.PLATFORM
        },
        "token": { type: mongoose_1.SchemaTypes.String, trim: true },
        "version": { type: mongoose_1.SchemaTypes.String, trim: true },
    },
    "isActive": { type: mongoose_1.SchemaTypes.Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true,
    collection: common_1.ENUM.COL.USER_SESSION
});
exports.default = mongoose_1.model(common_1.ENUM.COL.USER_SESSION, userSessionSchema);
//# sourceMappingURL=user_sessions.model.js.map