require("dotenv/config");

const amqp = require("amqplib/callback_api");
const url = `amqp://localhost:${process.env.QUEUEPORT}`;
console.log(`Connecting on ${url}`);
amqp.connect(url, function(err, conn) {
  conn.createChannel(function(err, ch) {
    const queue = "hello";
    const msg = "Hello World 123!";
    ch.assertQueue(queue, { durable: false });
    ch.sendToQueue(queue, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
