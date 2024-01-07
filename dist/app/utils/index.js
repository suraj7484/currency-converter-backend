"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../common/constants");
class Utils {
    static response(res, data, message, success, code) {
        const responseObj = {
            responseData: data,
            message: message,
            success: success,
            responseCode: code,
        };
        res.format({
            json: () => {
                res.status(code).send(responseObj);
            },
        });
    }
    static normalResponse(res, message) {
        const responseObj = message;
        res.format({
            json: () => {
                res.send(responseObj);
            },
        });
    }
    static responseForValidation(res, errorArray, success, code = 400) {
        const responseObj = {
            message: 'Invalid Request',
            errors: errorArray,
            success: success,
            responseCode: code,
        };
        res.format({
            json: () => {
                res.send(responseObj);
            },
        });
    }
    static handleError(err, req, res) {
        if (!res) {
            return;
        }
        err = err || {};
        const msg = err.message ? err.message : constants_1.apiFailureMessage.INTERNAL_SERVER_ERROR;
        const errorCode = err.code ? err.code : constants_1.httpConstants.RESPONSE_CODES.SERVER_ERROR;
        this.response(res, {}, msg, constants_1.httpConstants.RESPONSE_STATUS.FAILURE, errorCode);
    }
    static error(data, message, code = 500) {
        return {
            data: data,
            message: message,
            code: code,
        };
    }
    static getFormattedDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
    static lhtLog(functionName, message, payload, developerAlias, logType = 'INFO') {
        console.log(`[ ${this.getFormattedDate()} ] ${logType}: ${functionName}: ${message}: ${JSON.stringify(payload)}: Developer : ${developerAlias}`);
    }
}
Utils.func = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.default = Utils;
