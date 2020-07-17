"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const _common_1 = require("@common");
class Redis {
    constructor() {
        let options = {};
        if (_common_1.CONFIG.NODE_ENV !== "prod")
            options.db = 15;
        this.client = redis_1.default.createClient(options);
    }
    async setKey(key, value) {
        return new Promise((res, rej) => {
            this.client.set(key, value, (err, reply) => {
                if (err)
                    rej(err);
                else
                    res(reply);
            });
        });
    }
    async getFromKey(key) {
        return new Promise((res, rej) => {
            this.client.get(key, (err, reply) => {
                if (err)
                    rej(err);
                else
                    res(reply);
            });
        });
    }
    async deleteKey(key) {
        return new Promise((res, rej) => {
            this.client.del(key, (err, reply) => {
                if (err)
                    rej(err);
                else
                    res(reply);
            });
        });
    }
    async getIndentity(key) {
        let updatedIndentity = (parseInt(await this.getFromKey(key)) + 1).toString();
        this.setKey(key, updatedIndentity);
        return updatedIndentity;
    }
    async userSocketOp(op, userId, socketId) {
        switch (op) {
            case 'SET': {
                if (socketId)
                    this.setKey(`SOC_${userId}`, socketId);
                else
                    throw Error('REDIS_ERR: No socketId specified in userSocketId - set operation');
                break;
            }
            case 'GET': return this.getFromKey(`SOC_${userId}`);
            case 'DEL': return this.deleteKey(`SOC_${userId}`);
        }
    }
}
exports.redisDOA = new Redis();
//# sourceMappingURL=redis.database.js.map