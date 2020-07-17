"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class BaseEntity {
    constructor(model) {
        this.model = model;
        this.model = model;
    }
    async findOne(condition, project = {}, options = {}) {
        condition.isDelete = false;
        if (condition._id)
            condition._id = mongoose_1.Types.ObjectId(condition._id);
        return this.model.findOne(condition, project, options).lean().exec();
    }
    async findMany(condition, project = {}) {
        condition.isDelete = false;
        return await this.model.find(condition, project).lean().exec();
    }
    async count(condition) {
        condition.isDelete = false;
        return this.model.countDocuments(condition).lean().exec();
    }
    async distinct(key, condition) {
        condition.isDelete = false;
        return this.model.distinct(key, condition).lean().exec();
    }
    async editEntity(condition, payload, options = {}) {
        condition.isDelete = false;
        if (options.multi) {
            await this.model.updateMany(condition, payload, options).exec();
            return { type: 'MULTI' };
        }
        else {
            if (typeof options.new === 'undefined')
                options.new = true;
            let updatedData = await this.model.findOneAndUpdate(condition, payload, options).lean().exec();
            if (updatedData)
                return { type: 'SINGLE', data: updatedData };
            else
                return { type: 'SINGLE' };
        }
    }
    async updateEntity(condition, payload, options = {}) {
        condition.isDelete = false;
        if (options.multi) {
            await this.model.updateMany(condition, { $set: payload }, options).exec();
            return { type: 'MULTI' };
        }
        else {
            if (typeof options.new === 'undefined')
                options.new = true;
            let updatedData = await this.model.findOneAndUpdate(condition, { $set: payload }, options).lean().exec();
            if (updatedData)
                return { type: 'SINGLE', data: updatedData };
            else
                return { type: 'SINGLE' };
        }
    }
    async updateDocument(condition, payload, options) {
        let data = await this.model.findOneAndUpdate(condition, { $set: payload }, options).lean().exec();
        return data;
    }
    async updatewithIncrementDecrement(condition, payload, options) {
        let data = await this.model.findOneAndUpdate(condition, { $inc: payload }, options).lean().exec();
        return data;
    }
    async updatewithDeleteDocument(condition, payload, removepayload, options) {
        let data = await this.model.findOneAndUpdate(condition, { $set: payload, $unset: removepayload }, options).lean().exec();
        return data;
    }
    async basicAggregate(pipeline) {
        return this.model.aggregate(pipeline).collation({ locale: 'en', strength: 1 }).exec();
    }
    async paginateAggregate(pipeline, options = {}) {
        if (options.getCount) {
            pipeline.push({
                $facet: {
                    'total': [{ $count: 'count' }],
                    'result': [{ $skip: (options.page - 1) * options.limit }, { $limit: options.limit }]
                }
            });
            let aggregateData = await this.model.aggregate(pipeline).collation({ locale: 'en', strength: 1 }).exec();
            if (aggregateData.length) {
                if (aggregateData[0].result.length) {
                    let paginationResult = { next: false, page: options.page, total: aggregateData[0].total[0].count };
                    if ((options.limit * options.page) < paginationResult.total) {
                        paginationResult.next = true;
                    }
                    paginationResult.result = aggregateData[0].result;
                    return paginationResult;
                }
                else
                    return { next: false, result: [], page: options.page, total: aggregateData[0].total.length ? aggregateData[0].total[0].count : 0 };
            }
            else
                throw new Error('Error in paginate aggregation pipeline');
        }
        else {
            if (!options.prePaginated) {
                if (options.range)
                    pipeline.push({ $match: options.range });
                else
                    pipeline.push({ $skip: (options.page - 1) * options.limit });
                pipeline.push({ $limit: options.limit + 1 });
            }
            let aggregateData = await this.model.aggregate(pipeline).collation({ locale: 'en', strength: 1 }).exec();
            if (aggregateData.length) {
                let paginationResult = { next: false, page: options.page };
                if (aggregateData.length > options.limit) {
                    paginationResult.next = true;
                    paginationResult.result = aggregateData.slice(0, aggregateData.length - 1);
                }
                else
                    paginationResult.result = aggregateData;
                return paginationResult;
            }
            else
                return { next: false, result: [], page: options.page };
        }
    }
    async remove(condition) {
        let removedData = await this.model.deleteOne(condition).exec();
        if (removedData.ok && removedData.n)
            return { success: true };
        else
            return { success: false };
    }
    async bulkWrite(operations, options) {
        return this.model.bulkWrite(operations, options);
    }
}
exports.default = BaseEntity;
//# sourceMappingURL=base.entity.js.map