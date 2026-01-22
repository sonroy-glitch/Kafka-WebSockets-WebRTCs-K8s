"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("redis");
class PubSubManager {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }
    static getInstance() {
        if (PubSubManager.instance) {
            return PubSubManager.instance;
        }
        PubSubManager.instance = new PubSubManager();
        return PubSubManager.instance;
    }
    userSubscribe(userId, stock) {
        var _a, _b;
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.push(userId);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) == 1) {
            this.redisClient.subscribe(stock, (message) => {
                console.log(message);
            });
        }
        console.log(`Subscribed to stock ${stock} with userId ${userId}`);
    }
    userUnsubscribe(userId, stock) {
        var _a, _b;
        this.subscriptions.set(stock, ((_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.filter((item) => item != userId)) || []);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) == 0) {
            this.redisClient.unsubscribe(stock);
        }
        console.log(this.subscriptions);
    }
    handleMessage(userId, stock, message) {
        var _a;
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.map((item) => {
            console.log(`Sending ${message} to user ${item}`);
        });
    }
}
exports.PubSubManager = PubSubManager;
