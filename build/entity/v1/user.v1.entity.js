"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _common_1 = require("@common");
const base_entity_1 = __importDefault(require("../base.entity"));
const user_model_1 = __importDefault(require("@models/user.model"));
const user_sessions_model_1 = __importDefault(require("@models/user_sessions.model"));
const auth_service_1 = require("../../services/auth.service");
const constant_common_1 = require("../../common/constant.common");
class UserEntity extends base_entity_1.default {
    constructor(model) {
        super(model);
    }
    async createUser(payload) {
        payload.password = auth_service_1.Auth.hashData(payload.password, constant_common_1.CONSTANT.PASSWORD_HASH_SALT);
        let userData = await new this.model(payload).save();
        return userData.toObject();
    }
    async createUserNew(payload) {
        let adminData = await new this.model(payload).save();
        return adminData.toObject();
    }
    filterUserData(userData) {
        return userData;
    }
    async createNewSession(payload) {
        payload.userId = mongoose_1.Types.ObjectId(payload.userId);
        await this.removePreviousSession(payload.userId, true);
        let sessionData = await new user_sessions_model_1.default(payload).save();
        return sessionData.toObject();
    }
    async removePreviousSession(id, multi) {
        if (multi)
            await user_sessions_model_1.default.updateMany({ userId: id, isActive: true }, { isActive: false });
        else
            await user_sessions_model_1.default.updateOne({ _id: id }, { isActive: false });
    }
    async removeSession(id) {
        await user_sessions_model_1.default.updateMany({ _id: id }, { isActive: false });
    }
    async blockUser(userId, actionDir) {
        userId = mongoose_1.Types.ObjectId(userId);
        let updatedUser = await this.updateEntity({ _id: userId }, {
            isActive: !actionDir,
            status: actionDir ? _common_1.ENUM.USER.STATUS.BLOCK : _common_1.ENUM.USER.STATUS.ACTIVE
        });
        if (updatedUser.data) {
            if (actionDir)
                await this.removePreviousSession(userId, true);
            return { success: true };
        }
        else
            return { success: false };
    }
    async getAllUserTokens(payload) {
        let matchCondition = { 'device.token': { $exists: true, $ne: '' }, isDelete: false };
        if (payload.usersList)
            matchCondition['_id'] = { $in: payload.usersList };
        let userData = await this.basicAggregate([
            { $match: matchCondition },
            { $group: { _id: null, tokens: { $push: '$device.token' } } }
        ]);
        if (userData.length)
            return userData[0].tokens;
        else
            return [];
    }
    async checkUserAlreadyExists(payload) {
        let conditions = [];
        if (payload.resetToken && payload.resetToken != '')
            conditions.push({ resetToken: payload.resetToken });
        if (payload.email && payload.email != '')
            conditions.push({ email: payload.email });
        if (payload.phoneNo && payload.phoneNo != '' && payload.countryCode && payload.countryCode != '')
            conditions.push({ phoneNo: payload.phoneNo, countryCode: payload.countryCode });
        if (payload.userId)
            conditions.push({ _id: payload.userId });
        if (conditions.length) {
            let userData = await this.basicAggregate([
                {
                    $match: {
                        isDelete: false,
                        $or: conditions,
                    }
                }
            ]);
            return userData;
        }
        return [];
    }
    async checkSocialIdExists(payload) {
        let conditions = [];
        if (payload.socialType == _common_1.ENUM.LOGIN_TYPE.FACEBOOK)
            conditions.push({ facebookId: payload.socialId });
        if (payload.socialType == _common_1.ENUM.LOGIN_TYPE.GOOGLE)
            conditions.push({ googleId: payload.socialId });
        if (payload.socialType == _common_1.ENUM.LOGIN_TYPE.APPLE)
            conditions.push({ appleId: payload.socialId });
        let userData = await this.basicAggregate([
            {
                $match: {
                    isDelete: false,
                    $or: conditions
                }
            }
        ]);
        return userData;
    }
    async createUserFromSocialId(payload) {
        let dataToSave = {
            name: payload.name
        };
        if (payload.email && payload.email != '') {
            dataToSave.email = payload.email,
                dataToSave.emailVerified = true;
        }
        ;
        if (payload.countryCode && payload.countryCode != '' && payload.phoneNo && payload.phoneNo != '') {
            dataToSave.countryCode = payload.countryCode,
                dataToSave.phoneVerified = true;
        }
        ;
        if (payload.phoneNo)
            dataToSave.phoneNo = payload.phoneNo;
        if (payload.socialType == _common_1.ENUM.LOGIN_TYPE.FACEBOOK)
            dataToSave.facebookId = payload.socialId;
        if (payload.socialType == _common_1.ENUM.LOGIN_TYPE.APPLE)
            dataToSave.appleId = payload.socialId;
        if (payload.socialType == _common_1.ENUM.LOGIN_TYPE.GOOGLE)
            dataToSave.googleId = payload.socialId;
        let userData = await new this.model(dataToSave).save();
        return userData.toObject();
    }
    async verifyUser(userId) {
        let update = {
            emailVerified: true,
            otp: null
        };
        return await this.updateDocument({ _id: userId }, update);
    }
    async mergeUserAccount(payload, userData) {
        try {
            let dataToUpdate = {};
            if (payload.platform == _common_1.ENUM.LOGIN_TYPE.FACEBOOK)
                dataToUpdate = { facebookId: payload.data.facebookId };
            if (payload.platform == _common_1.ENUM.LOGIN_TYPE.GOOGLE)
                dataToUpdate = { googleId: payload.data.googleId };
            if (payload.platform == _common_1.ENUM.LOGIN_TYPE.GOOGLE)
                dataToUpdate = { googleId: payload.data.appleId };
            return await this.updateDocument({ _id: userData._id }, dataToUpdate);
        }
        catch (error) {
            console.log(error);
        }
    }
    removeUnnecessaryData(data) {
        delete (data.password);
        delete (data.otp);
        delete (data.otpExpiry);
        delete (data.resetToken);
        return data;
    }
}
exports.UserV1 = new UserEntity(user_model_1.default);
//# sourceMappingURL=user.v1.entity.js.map