"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const _entity_1 = require("@entity");
const services_1 = require("../services");
const builders_1 = __importDefault(require("../builders"));
const mongoose_1 = require("mongoose");
class SocketClass {
    constructor() {
    }
    static getSocket(server) {
        if (typeof this.instance === "undefined") {
            this.io = socket_io_1.default(server);
            this.getInstance();
            this.instance = new this();
        }
        return this.instance;
    }
    static getInstance() {
        this.io.on('connection', (socket, userId) => {
            if (socket.handshake.query.userId) {
                console.log('new socket connected', socket.handshake.query.userId, socket.id, userId);
                services_1.RedisClass.setSocketId(socket.handshake.query.userId, socket.id);
                this.updateUserOnlineStatus(socket.handshake.query.userId, true, new Date());
                this.sendDirectMessage(socket, this.io);
                this.ReceivedMessages(socket, this.io);
                this.Disconnected(socket, this.io);
                this.Reconnect(socket, this.io);
                this.getChatForAUser(socket, this.io);
                this.getAllChattedUsers(socket, this.io);
                this.informStateChange(socket.handshake.query.userId, true);
                this.UserTyping(socket);
                this.deleteWholeChatWithUser(socket);
            }
        });
    }
    static async sendDirectMessage(socket, io) {
        socket.on('Direct_msg', async (data) => {
            console.log("DIRECT MESSAGE EVENT CALLED", data.receiverId);
            let room = "";
            let receiverSocket = await services_1.RedisClass.getSocketId(data.receiverId);
            console.log(receiverSocket, "receiverSocket is...............");
            let Ids = [];
            Ids.push(socket.handshake.query.userId);
            Ids.push(data.receiverId);
            Ids.sort((a, b) => { return a.localeCompare(b); });
            console.log(">>>>>>>>>>>>>>>>IDS.......", Ids[0], "........", Ids[1]);
            room += Ids[0] + Ids[1];
            console.log("????????????room", room);
            _entity_1.chatV1.saveNewMsg({ sender: socket.handshake.query.userId, receiver: data.receiverId, message: data.msg, roomId: room, receivers: [socket.handshake.query.userId, data.receiverId] });
            console.log("direct msg", data);
            if (receiverSocket) {
                console.log("??????into if");
                io.sockets.connected[receiverSocket].join(room);
            }
            console.log("out of if?????????????", data);
            socket.join(room);
            io.to(room).emit('Direct_msg', { _id: socket.handshake.query.userId, sender: socket.handshake.query.userId, receiver: data.receiverId, name: data.name, msg: data.msg, time: new Date().toISOString() });
        });
    }
    static async ReceivedMessages(socket, io) {
        socket.on('Message_Received_Successfully', (data) => {
            _entity_1.chatV1.editEntity({ createdAt: { $lte: data.lastMessageTime }, receivers: { $in: [socket.handshake.query.userId] } }, { $push: { receivedBy: socket.handshake.query.userId } });
        });
    }
    static async Disconnected(socket, io) {
        socket.on('disconnect', () => {
            services_1.RedisClass.removeSocketId(socket.handshake.query.userId);
            this.updateUserOnlineStatus(socket.handshake.query.userId, false, new Date());
            this.informStateChange(socket.handshake.query.userId, false, new Date().toISOString());
        });
        socket.on('disconnected', () => {
            services_1.RedisClass.removeSocketId(socket.handshake.query.userId);
            this.updateUserOnlineStatus(socket.handshake.query.userId, false, new Date());
            this.informStateChange(socket.handshake.query.userId, false, new Date().toISOString());
        });
    }
    static async Reconnect(socket, io) {
        socket.on('reconnect', () => {
            services_1.RedisClass.setSocketId(socket.handshake.query.userId, socket.id);
            this.updateUserOnlineStatus(socket.handshake.query.userId, true, new Date());
            this.informStateChange(socket.handshake.query.userId, true);
        });
    }
    static async getAllDirectMessages(socket, io) {
        console.log("MESAGE LIST CALLED");
        let pipeline = builders_1.default.User.Chat.chatList(socket.handshake.query.userId);
        let response = await _entity_1.UserV1.basicAggregate(pipeline);
        socket.emit('MessageList', { data: response });
    }
    static async getChatForAUser(socket, io) {
        socket.on('ourChatMessages', async (data) => {
            try {
                console.log("OUR CHAT MESAGES CALLED");
                if (!data.page) {
                    data.page = 1;
                    data.limit = 5;
                }
                let room = await this.getRoomId(data, socket);
                let pipeline = await builders_1.default.User.Chat.ourChatMessages(socket.handshake.query.userId, room, data.receiverId);
                let list = await _entity_1.chatV1.paginateAggregate(pipeline, { page: data.page, limit: data.limit, getCount: true });
                let user = await _entity_1.UserV1.findOne({ _id: data.receiverId });
                if (user.isOnline) {
                    list.isOnline = true;
                }
                else {
                    list.lastSeen = user.lastSeen;
                }
                socket.emit('ourChatMessages', list);
                services_1.RedisClass.addIdsToInformStateChange(data.receiverId, socket.handshake.query.userId);
            }
            catch (err) {
                socket.emit("error", err);
            }
        });
    }
    static async getAllChattedUsers(socket, io) {
        socket.on('allchattedUsers', async (data) => {
            console.log("?????????????????????all chatted users hit");
            let pipeline = await builders_1.default.User.Chat.allChattedUsers(socket.handshake.query.userId);
            let list = await _entity_1.chatV1.paginateAggregate(pipeline, { page: data.page, limit: data.limit, getCount: true });
            console.log(list);
            socket.emit('allchattedUsers', list);
        });
    }
    static async getRoomId(data, socket) {
        let room = "";
        let Ids = [];
        Ids.push(socket.handshake.query.userId);
        Ids.push(data.receiverId);
        Ids.sort((a, b) => { return a.localeCompare(b); });
        room += Ids[0] + Ids[1];
        return room;
    }
    static async updateUserOnlineStatus(userId, status, time) {
        _entity_1.UserV1.updateDocument({ _id: userId }, { isOnline: status, lastSeen: time });
    }
    static async informStateChange(userId, status, lastSeen) {
        console.log("INFORM STAET XHANGE CALLED");
        let usersToInform = await services_1.RedisClass.getIdsToInformStateChange(userId);
        console.log(usersToInform, "--------------------satate change inform HERE");
        if (usersToInform && usersToInform.length) {
            usersToInform.forEach(async (user) => {
                let socketId = await services_1.RedisClass.getSocketId(user);
                let dataToSend = {
                    userId: userId,
                    status: status,
                    lastSeen: lastSeen
                };
                this.io.to(socketId).emit('stateChange', dataToSend);
            });
        }
    }
    static async deleteWholeChatWithUser(socket) {
        let receiver;
        socket.on("deleteWholeChat", (data) => {
            receiver = data.receiverId;
            console.log("into delete>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            _entity_1.chatV1.editEntity({ type: "single", receivers: { $all: [mongoose_1.Types.ObjectId(socket.handshake.query.userId), mongoose_1.Types.ObjectId(data.receiverId)] } }, { $push: { deletedFor: socket.handshake.query.userId } }, { multi: true });
            socket.emit("deleteWholeChat", { success: true, _id: receiver });
        });
    }
    static async UserTyping(socket) {
        socket.on("typing", async (data) => {
            console.log("TYPING EVENT HIT........................");
            let receiverSocket = await services_1.RedisClass.getSocketId(data.receiverId);
            if (receiverSocket) {
                this.io.to(receiverSocket).emit("typing", { userId: socket.handshake.query.userId });
            }
        });
    }
}
exports.SocketClass = SocketClass;
exports.default = new SocketClass();
//# sourceMappingURL=index.js.map