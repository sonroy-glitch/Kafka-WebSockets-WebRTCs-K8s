"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function submission(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var body = JSON.parse(data);
        yield new Promise(resolve => setTimeout(resolve, 7000));
        console.log(body.problemId);
        console.log(body.code);
        console.log(body.language);
        console.log(`Finished processing submission for problemId ${body.problemId}.`);
    });
}
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            while (true) {
                try {
                    var data = yield client.brPop("problems", 0);
                    console.log("Data sent for processing");
                    yield submission(data.element);
                }
                catch (error) {
                    console.log("Error handling submission" + error);
                }
            }
        }
        catch (error) {
            console.log("Failed connecting to redis");
        }
    });
}
connect();
