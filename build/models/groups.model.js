"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
const groupSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String, required: true },
    admins: { type: [mongoose_1.SchemaTypes.ObjectId] },
    members: { type: [mongoose_1.SchemaTypes.ObjectId] },
    creator: { type: mongoose_1.SchemaTypes.ObjectId },
    icon: { type: mongoose_1.SchemaTypes.String },
}, {
    versionKey: false,
    timestamps: true,
    collection: common_1.ENUM.COL.GROUP
});
exports.default = mongoose_1.model(common_1.ENUM.COL.GROUP, groupSchema);
//# sourceMappingURL=groups.model.js.map