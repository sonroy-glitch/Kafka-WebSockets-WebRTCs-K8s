"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = worker;
const store_1 = require("./store");
function worker() {
    setInterval(() => {
        store_1.PubSubManager.getInstance().handleMessage("sd", "APPL", String(Math.random()));
    }, 2000);
}
