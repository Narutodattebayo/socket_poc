"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../../common");
class Mongo {
    constructor() { }
    async connectDatabase(uri) {
        mongoose_1.default.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            poolSize: common_1.CONFIG.DB_POOLSIZE
        }).then(() => {
            console.log(`SUCCESS: database connected to "${uri}"`);
        }, (err) => {
            console.log(`ERROR: database failed to connect "${uri}"`);
            console.log('ERROR: ', err);
            process.exit(common_1.SYS_ERR.MONGO_CONN_FAILED);
        });
        if (process.env.NODE_ENV !== 'prod')
            mongoose_1.default.set('debug', true);
    }
}
exports.mongoDOA = new Mongo();
//# sourceMappingURL=mongo.database.js.map