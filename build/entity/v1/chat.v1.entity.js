"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../base.entity"));
const chat_model_1 = __importDefault(require("@models/chat.model"));
class ChatEntity extends base_entity_1.default {
    constructor(model) {
        super(model);
    }
    async saveNewMsg(payload) {
        let msg = await new this.model(payload).save();
        return msg.toObject();
    }
}
exports.chatV1 = new ChatEntity(chat_model_1.default);
//# sourceMappingURL=chat.v1.entity.js.map