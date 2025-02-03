"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
//sorry for this, I was getting pretty annoyed to having to write 'content-type.....' on each request so just added it here
const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};
exports.sendResponse = sendResponse;
