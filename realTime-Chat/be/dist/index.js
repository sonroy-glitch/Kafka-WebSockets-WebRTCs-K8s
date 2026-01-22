"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const httpServer = app.listen(8081);
const wss = new ws_1.WebSocketServer({ server: httpServer });
const client = new Map();
wss.on("connection", (ws, request) => {
    var _a;
    ws.on('error', console.error);
    const userId = (_a = request.url) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    console.log(userId);
    client.set(userId, ws);
    ws.on("message", (message, isBinary) => {
        const data = JSON.parse(String(message));
        console.log(data.receiverId);
        const receiverSocket = client.get(data.receiverId);
        // console.log(receiverSocket)
        if (receiverSocket) {
            if (receiverSocket.readyState === WebSocket.OPEN) {
                receiverSocket.send(data.message, { isBinary: true });
            }
            else {
                const senderSocket = client.get(userId);
                if (senderSocket) {
                    senderSocket.send("Receiver not initialised", { isBinary: false });
                }
            }
        }
        else {
            const senderSocket = client.get(userId);
            if (senderSocket) {
                senderSocket.send("Receiver not found", { isBinary: false });
            }
        }
    });
});
