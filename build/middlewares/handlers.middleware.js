"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.ErrorHandler = function (err, req, res, next) {
    if (celebrate_1.isCelebrate(err)) {
        let messagetosend = err.joi.details[0].message.replace(/"/g, '');
        messagetosend = messagetosend[0].toUpperCase() + messagetosend.slice(1);
        return res.status(400).send({
            success: false,
            statusCode: 400,
            key: err.joi.details[0].context.key,
            message: messagetosend
        });
    }
    else if (err.expose) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode
        });
    }
    else {
        console.log('ERROR -> ', err);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
};
exports.InvalidRoute = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Invalid route',
        statusCode: 404
    });
};
//# sourceMappingURL=handlers.middleware.js.map