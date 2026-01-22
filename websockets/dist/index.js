"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const userSockets = new Map();
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on("connection", (ws, request) => {
    const url = request.url;
    if (url) {
        const userId = url.split("%22")[1];
        userSockets.set(userId, ws);
        ws.on('error', console.error);
        ws.on('message', (data, isBinary) => {
            const userId = url.split("%22")[1];
            const message = JSON.parse(String(data));
            const receiverSocket = userSockets.get(message.receiverId);
            if (receiverSocket) {
                receiverSocket.send(message.message, { binary: false });
            }
            else {
                const userSocket = userSockets.get(userId);
                userSocket.send("Recipent does not exist", { binary: false });
            }
        });
    }
});
