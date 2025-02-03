"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageQueueService = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
//rabbitMQ!
class MessageQueueService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    async connect() {
        this.connection = await amqplib_1.default.connect("amqp://localhost");
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue("attack_queue", { durable: true });
    }
    async sendToQueue(queue, message) {
        if (this.channel) {
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
        }
    }
    async consume(queue, callback) {
        if (this.channel) {
            await this.channel.consume(queue, callback, { noAck: false });
        }
    }
    getChannel() {
        return this.channel;
    }
    async close() {
        if (this.channel)
            await this.channel.close();
        if (this.connection)
            await this.connection.close();
    }
}
exports.messageQueueService = new MessageQueueService();
