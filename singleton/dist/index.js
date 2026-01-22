"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const store_1 = require("./store");
(0, logger_1.startLogger)();
store_1.gameManager.addGame({
    "id": "1",
    "whitePlayer": "Bob",
    "blackPlayer": "Bobiya",
    moves: []
});
setInterval(() => {
    store_1.gameManager.addMove("1", String(Math.random()));
}, 5000);
