"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.PendingMessages = (userId) => {
    let pipeline = [];
    pipeline.push({ $match: { receiver: mongoose_1.Types.ObjectId(userId), isReceived: false } });
    pipeline.push({
        $group: {
            _id: "$sender",
            messages: { $push: "$$ROOT" }
        }
    });
    return pipeline;
};
exports.userList = (userId, payload) => {
    let pipeline = [];
    pipeline.push({ $match: { isDelete: false, emailVerified: true, _id: { $ne: mongoose_1.Types.ObjectId(userId) } } });
    if (payload.search) {
        pipeline.push({ $match: { name: { $regex: payload.search, $options: 'i' } } });
    }
    pipeline.push({
        $project: {
            name: 1,
            email: 1
        }
    });
    return pipeline;
};
exports.chatList = (userId) => {
    let pipeline = [];
    pipeline.push({ $match: { receivers: { $in: [mongoose_1.Types.ObjectId(userId)] } } });
    pipeline.push({
        $project: {
            sender: 1,
            message: 1,
            createdAt: 1
        }
    });
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({
        $group: {
            _id: '$roomId',
            messages: { $push: '$$ROOT' }
        }
    });
    return pipeline;
};
exports.myGroups = (userId) => {
    let pipeline = [];
    pipeline.push({ $match: { members: { $in: [userId] } } });
    pipeline.push({ $project: { name: 1 } });
    pipeline.push({
        $group: {
            _id: null,
            ids: { $push: '$_id' }
        }
    });
    return pipeline;
};
exports.ourChatMessages = (userId, roomId, receiver) => {
    let pipeline = [];
    pipeline.push({
        $match: { roomId: roomId, deletedFor: { $nin: [mongoose_1.Types.ObjectId(userId)] } }
    });
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({
        $project: {
            sender: 1,
            receiver: receiver,
            msg: '$message',
            time: '$createdAt',
            isSender: { $cond: { if: { $eq: ['$sender', userId] }, then: true, else: false } }
        }
    });
    return pipeline;
};
exports.allChattedUsers = (userId) => {
    let pipeline = [];
    pipeline.push({ $match: { deletedFor: { $nin: [mongoose_1.Types.ObjectId(userId)] }, receivers: { $in: [mongoose_1.Types.ObjectId(userId)] } } });
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({
        $group: {
            _id: '$roomId',
            data: { $push: "$$ROOT" }
        }
    });
    pipeline.push({
        $addFields: {
            notSeen: {
                $filter: {
                    input: "$data",
                    as: "all",
                    cond: { $not: { $setIsSubset: [[mongoose_1.Types.ObjectId(userId)], "$$all.seenBy"] } }
                }
            }
        }
    });
    pipeline.push({
        $project: {
            count: { $size: "$notSeen" },
            lastMessage: { $slice: ["$data", 1] },
            person: 1
        }
    });
    pipeline.push({ $unwind: { path: "$lastMessage", preserveNullAndEmptyArrays: true } });
    pipeline.push({
        $addFields: {
            chattedPerson: {
                $cond: { if: { $eq: ["$lastMessage.sender", mongoose_1.Types.ObjectId(userId)] }, then: "$lastMessage.receiver", else: "$lastMessage.sender" }
            }
        }
    });
    pipeline.push({
        $lookup: {
            from: "users",
            let: { person: "$chattedPerson" },
            pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$person'] } } },
                { $project: { name: 1, email: 1 } }
            ],
            as: "user"
        }
    });
    pipeline.push({ $unwind: { path: "$user", preserveNullAndEmptyArrays: true } });
    pipeline.push({
        $project: {
            unreadCount: "$count",
            messageType: "$lastMessage.type",
            msg: '$lastMessage.message',
            time: '$lastMessage.createdAt',
            receiver: "$lastMessage.receiver",
            sender: "$lastMessage.sender",
            _id: "$user._id",
            name: "$user.name",
            email: "$user.email"
        }
    });
    pipeline.push({ $sort: { time: -1 } });
    return pipeline;
};
//# sourceMappingURL=user.js.map