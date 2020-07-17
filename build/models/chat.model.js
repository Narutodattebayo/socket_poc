"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
const chatSchema = new mongoose_1.Schema({
    type: { type: mongoose_1.SchemaTypes.String, required: true, default: 'single' },
    groupId: { type: mongoose_1.SchemaTypes.ObjectId },
    sender: { type: mongoose_1.SchemaTypes.ObjectId, required: true },
    receiver: { type: mongoose_1.SchemaTypes.ObjectId },
    receivers: { type: [mongoose_1.SchemaTypes.ObjectId], required: true },
    message: { type: mongoose_1.SchemaTypes.String, required: true },
    receivedBy: { type: [mongoose_1.SchemaTypes.ObjectId], default: [] },
    seenBy: { type: [mongoose_1.SchemaTypes.ObjectId], default: [] },
    roomId: { type: mongoose_1.SchemaTypes.String },
    deletedFor: { type: [mongoose_1.SchemaTypes.ObjectId], default: [] },
    isDelete: { type: mongoose_1.SchemaTypes.Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true,
    collection: common_1.ENUM.COL.CHAT
});
exports.default = mongoose_1.model(common_1.ENUM.COL.CHAT, chatSchema);
//# sourceMappingURL=chat.model.js.map