"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
if (!process.env.NODE_ENV) {
    console.error("ERROR: No Node Environment defined");
    process.exit(100);
}
const database_1 = require("../database");
const helper_service_1 = require("../helper.service");
const Seeder = __importStar(require("./seeder.bootstrap"));
database_1.mongoDOA.connectDatabase(process.env.DB_URI);
exports.bootstrapStatus = {
    createDirectory: helper_service_1.Helper.createNewDirectory('bin'),
    environmentCheck: helper_service_1.Helper.checkFileExists(`bin/.env.${process.env.NODE_ENV}`),
    createAdmin: Seeder.createAdmin([
        { name: 'Admin', email: "admin@yopmail.com" },
    ]),
};
console.clear();
console.log('~~~ Initiating Bootstrapping ~~~\n');
console.log(`1. Create Required Directories: ${exports.bootstrapStatus.createDirectory ? '✔' : '❌'}`);
console.log(`2. Environment File Exists: ${exports.bootstrapStatus.environmentCheck ? '✔' : '❌'}`);
console.log(`3. Admin Exists: ${exports.bootstrapStatus.createAdmin ? '✔' : '❌'}`);
console.log('\n~~~ Completed Bootstrapping ~~~\n');
//# sourceMappingURL=index.js.map