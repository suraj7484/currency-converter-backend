"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const heavyAxioOperations = ({ method, url, headers, params, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const axiosOptions = {
            method,
            headers,
            params,
            url: url
        };
        const callResponse = yield (0, axios_1.default)(axiosOptions);
        return callResponse.data;
    }
    catch (err) {
        const errorResponse = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data;
        return errorResponse;
    }
});
process.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedMessage = JSON.parse(message);
    const callResponse = yield heavyAxioOperations(parsedMessage);
    process.send(callResponse);
}));
