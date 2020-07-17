"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class RedisSockets {
    constructor() {
        this.client = redis_1.default.createClient();
        this.multiObject = this.client.multi();
    }
    async setSocketId(userId, socketId) {
        this.client.set(userId, socketId, (err, result) => {
            if (err)
                console.log(err, "111111111111111111");
            console.log(result);
        });
        return;
    }
    async getSocketId(userId) {
        return new Promise((resolve, reject) => {
            console.log("getsocketid called");
            this.client.get(userId, (err, socket) => {
                if (err) {
                    console.log(err, 2222222222222222222222222222);
                }
                else {
                    console.log("?????????????????", socket);
                    resolve(socket);
                }
            });
        });
    }
    async removeSocketId(userId) {
        this.client.del(userId);
    }
    async addIdToRedisGroupCollection(groups, socketid) {
    }
    async addIdsToInformStateChange(receiverId, userId) {
        try {
            return new Promise((resolve, reject) => {
                console.log(receiverId, userId);
                this.client.sadd(JSON.stringify(receiverId), userId, (err, result) => {
                    if (err) {
                        console.log(err, "error in adding ...............");
                        reject(err);
                    }
                    else {
                        console.log(result, "added successfully response");
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    async getIdsToInformStateChange(userId) {
        try {
            return new Promise((resolve, reject) => {
                this.client.smembers(JSON.stringify(userId), (err, result) => {
                    if (err) {
                        console.log(444444444444444444444444444444444444);
                        reject(err);
                    }
                    else {
                        console.log(result, "response result");
                        resolve(result);
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
}
exports.RedisClass = new RedisSockets();
//# sourceMappingURL=redis.sockets.js.map