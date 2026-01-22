"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const worker_1 = require("./worker");
(0, worker_1.worker)();
store_1.PubSubManager.getInstance().userSubscribe('sr', 'APPL');
store_1.PubSubManager.getInstance().userSubscribe('sd', 'APPL');
setTimeout(() => {
    store_1.PubSubManager.getInstance().userUnsubscribe('sr', 'APPL');
}, 3000);
