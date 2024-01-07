"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currency_1 = __importDefault(require("../../app/module/currency"));
const converter_1 = __importDefault(require("../../app/module/converter"));
const route = (0, express_1.Router)();
route.get("/crypto-currency-list", new currency_1.default().fetchCurrencyList);
route.get("/crypto-currency-converter", new converter_1.default().currencyConverter);
exports.default = route;