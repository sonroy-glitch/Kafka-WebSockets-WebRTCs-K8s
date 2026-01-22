"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogger = startLogger;
const store_1 = require("./store");
function startLogger() {
    setInterval(() => {
        store_1.gameManager.log();
    }, 4000);
}
