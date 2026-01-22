"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
const room = new Map(); //room logic implementation
wss.on("connection", (ws, request) => {
    var _a;
    const roomId = (_a = request.url) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    if (!room.has(roomId)) {
        room.set(roomId, new Map());
    }
    var userId = (0, uuid_1.v4)();
    ws.send(JSON.stringify({ type: "userId", id: userId })); //set this in the frontend
    var rooms = room.get(roomId);
    rooms.set(userId, ws);
    ws.on("error", console.error);
    ws.on("message", (data) => {
        const message = JSON.parse(String(data));
        if (message.type == "createOffer") {
            console.log('1 ' + message.sdp);
            room.get(roomId).forEach((item) => {
                if (item != ws) {
                    item === null || item === void 0 ? void 0 : item.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
                }
            });
        }
        else if (message.type == "createAnswer") {
            console.log("2 " + message.sdp);
            room.get(roomId).forEach((item) => {
                if (item != ws) {
                    item === null || item === void 0 ? void 0 : item.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }));
                }
            });
        }
        else if (message.type == "iceCandidate") {
            console.log("3 " + message.candidate);
            room.get(roomId).forEach((item) => {
                if (item != ws) {
                    item === null || item === void 0 ? void 0 : item.send(JSON.stringify({ type: "iceCandidate", iceCandidate: message.candidate }));
                }
            });
        }
    });
});
