"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../base.entity"));
const groups_model_1 = __importDefault(require("@models/groups.model"));
class GroupEntity extends base_entity_1.default {
    constructor(model) {
        super(model);
    }
    async createGroup(payload) {
        let group = await new this.model(payload).save();
        return group.toObject();
    }
}
exports.groupV1 = new GroupEntity(groups_model_1.default);
//# sourceMappingURL=group.v1.entity.js.map