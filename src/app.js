"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const mail_1 = __importDefault(require("./services/mail"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(bodyParser.json());
        this.routes();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' });
        });
        this.app.route("/mail").post((req, res) => {
            const message = Object.assign({}, req.body);
            mail_1.default.to = message.to;
            mail_1.default.subject = message.subject;
            mail_1.default.message = message.message;
            let result = mail_1.default.sendMail();
            res.status(200).json({ 'result': result });
        });
    }
}
exports.default = new App();
