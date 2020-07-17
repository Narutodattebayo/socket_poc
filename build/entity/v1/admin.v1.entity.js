"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _services_1 = require("@services");
const base_entity_1 = __importDefault(require("../base.entity"));
const admin_model_1 = __importDefault(require("@models/admin.model"));
const admin_session_model_1 = __importDefault(require("@models/admin_session.model"));
class AdminEntity extends base_entity_1.default {
    constructor(model) {
        super(model);
    }
    async createAdmin(payload) {
        payload.password = _services_1.Auth.hashData('Admin@123', payload.salt);
        let adminData = await new this.model(payload).save();
        return adminData.toObject();
    }
    async verifyPassword(adminData, password) {
        return adminData.password === _services_1.Auth.hashData(password, adminData.salt);
    }
    filterAdminData(adminData) {
        delete adminData.password;
        delete adminData.salt;
        return adminData;
    }
    async createNewSession(payload) {
        payload.adminId = mongoose_1.Types.ObjectId(payload.adminId);
        let sessionData = await new admin_session_model_1.default(payload).save();
        return sessionData.toObject();
    }
    async removePreviousSession(id, multi) {
        if (multi)
            await admin_session_model_1.default.updateMany({ adminId: id, isActive: true }, { isActive: false });
        else
            await admin_session_model_1.default.updateOne({ _id: id }, { isActive: false });
    }
}
exports.AdminV1 = new AdminEntity(admin_model_1.default);
//# sourceMappingURL=admin.v1.entity.js.map