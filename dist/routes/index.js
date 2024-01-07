"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_1 = __importDefault(require("./v1"));
const v2_1 = __importDefault(require("./v2"));
const constants_1 = require("../app/common/constants");
const route = (0, express_1.Router)();
route.get("/", (req, res) => res.send(constants_1.stringConstants.SERVICE_STATUS_HTML));
route.use("/api/v1", v1_1.default);
route.use("/api/v2", v2_1.default);
exports.default = route;
