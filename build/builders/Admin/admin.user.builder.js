"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const mongoose_1 = require("mongoose");
const _builders_1 = __importDefault(require("@builders"));
exports.UserList = (payload) => {
    let pipeline = [];
    let matchconditions = [];
    let filterConditions = [];
    if (payload.search) {
        matchconditions.push({ name: { $regex: payload.search, $options: "si" } }, { email: { $regex: payload.search, $options: "si" } }, { phoneNo: { $regex: payload.search, $options: "si" } });
    }
    if (payload.status && payload.status != "") {
        let statuses = payload.status.split(',');
        if (statuses.indexOf('active') != -1) {
            filterConditions.push({ status: "active" });
        }
        if (statuses.indexOf('block') != -1) {
            filterConditions.push({ status: "block" });
        }
        if (statuses.indexOf('elite') != -1) {
            filterConditions.push({ userType: "elite" });
        }
        if (statuses.indexOf('basic') != -1) {
            filterConditions.push({ userType: "basic" });
        }
    }
    pipeline.push({ $match: { isDelete: false } });
    if (matchconditions.length)
        pipeline.push({ $match: { $or: matchconditions } });
    if (filterConditions.length)
        pipeline.push({ $match: { $and: filterConditions } });
    if (payload.sortKey) {
        if (payload.sortKey == "name")
            pipeline.push({ $sort: { name: 1 } });
        if (payload.sortKey == "createdAt")
            pipeline.push({ $sort: { createdAt: -1 } });
    }
    else
        pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({
        $lookup: {
            from: "cars",
            let: { user: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: ['$userId', '$$user'] }, isDelete: false } }
            ],
            as: "userCars"
        }
    });
    pipeline.push({
        $lookup: {
            from: "events",
            let: { user: "$_id" },
            pipeline: [{
                    $match: {
                        $expr: { $eq: ['$createdBy', '$$user'] }, isDelete: false, isPublished: true
                    }
                }
            ],
            as: "eventsCreated"
        }
    });
    pipeline.push({ $project: index_1.Projections.AdminUserList.userDetails });
    return pipeline;
};
exports.checkExistingUser = (payload, userId) => {
    let pipeline = [];
    let conditions = [];
    pipeline.push({ $match: { _id: { $ne: mongoose_1.Types.ObjectId(userId) }, isDelete: false } });
    if (payload.email) {
        conditions.push({ email: payload.email });
    }
    if (payload.countryCode && payload.countryCode != "" && payload.phoneNo && payload.phoneNo != "") {
        conditions.push({ countryCode: payload.countryCode, phoneNo: payload.phoneNo });
    }
    pipeline.push({ $match: { $or: conditions } });
    return pipeline;
};
exports.userCarList = (userId) => {
    let pipeline = [];
    pipeline.push({ $match: { userId: mongoose_1.Types.ObjectId(userId), isDelete: false } });
    return pipeline;
};
exports.carDetails = (carId) => {
    let pipeline = [];
    pipeline.push({ $match: { userId: mongoose_1.Types.ObjectId(carId), isDelete: false } });
    return pipeline;
};
exports.UserDetails = (userId) => {
    let pipeline = [];
    pipeline.push({ $match: { _id: mongoose_1.Types.ObjectId(userId) } });
    pipeline.push({
        $lookup: {
            from: "cars",
            let: { user: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: ['$userId', '$$user'] }, isDelete: false } }
            ],
            as: "userCars"
        }
    });
    pipeline.push({ $project: _builders_1.default.Admin.Projections.AdminUserList.AdminuserDetails });
    return pipeline;
};
//# sourceMappingURL=admin.user.builder.js.map