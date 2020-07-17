"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mime_types_1 = __importDefault(require("mime-types"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const _common_1 = require("@common");
class S3ServiceClass {
    constructor(basePath) {
        this.bucket = _common_1.CONFIG.AWS.BUCKET;
        this.basePath = basePath;
        this.s3 = new s3_1.default({
            accessKeyId: _common_1.CONFIG.AWS.ACCESS_KEY,
            secretAccessKey: _common_1.CONFIG.AWS.SECRET_KEY
        });
    }
    async upload(name, data) {
        let contentType = mime_types_1.default.lookup(name);
        if (!contentType)
            throw Error('Invalid content Type');
        return this.s3.upload({
            Key: `${this.basePath}${name}`,
            Body: data,
            ContentType: contentType,
            Bucket: this.bucket,
            ACL: 'public-read'
        }).promise();
    }
}
exports.S3_Image = new S3ServiceClass(_common_1.BASE.AWS.IMAGE_PATH);
exports.S3_ARModel = new S3ServiceClass(_common_1.BASE.AWS.AR_MODEL_PATH);
//# sourceMappingURL=s3.aws.service.js.map