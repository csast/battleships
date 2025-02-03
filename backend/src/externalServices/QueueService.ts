import amqp from "amqplib";

//rabbitMQ!


class MessageQueueService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect() {
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue("attack_queue", { durable: true });
  }

  async sendToQueue(queue: string, message: object) {
    if (this.channel) {
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    }
  }

  async consume(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
    if (this.channel) {
      await this.channel.consume(queue, callback, { noAck: false });
    }
  }

  getChannel() {
    return this.channel;
  }

  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}

export const messageQueueService = new MessageQueueService();
