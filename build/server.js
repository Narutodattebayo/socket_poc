"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const app_1 = __importDefault(require("./app"));
const index_1 = require("./socket/index");
let server = app_1.default.instance.listen(common_1.CONFIG.APP_PORT);
index_1.SocketClass.getSocket(server);
server.on('listening', function () {
    console.log(`Server started listening on port ${common_1.CONFIG.APP_PORT}`);
});
//# sourceMappingURL=server.js.map