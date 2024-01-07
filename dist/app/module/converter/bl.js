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
const child_process_1 = require("child_process");
const utils_1 = __importDefault(require("../../utils"));
const constants_1 = require("../../common/constants");
const path_1 = __importDefault(require("path"));
class bl {
    currencyConverter(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = global.rootDir;
            const AxiosForked = (0, child_process_1.fork)(path_1.default.join(rootDir, "./workers/axiosServiceWorker"));
            AxiosForked.send(JSON.stringify({
                method: "GET",
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.SECRET_KEY,
                },
                url: "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
                params: {
                    amount: 1,
                    symbol: "BTC",
                    convert: "INR"
                }
            }));
            AxiosForked.on("message", (message) => {
                utils_1.default.response(response, message, constants_1.apiSuccessMessage.FETCH_SUCCESS, true, 200);
            });
        });
    }
}
exports.default = bl;
