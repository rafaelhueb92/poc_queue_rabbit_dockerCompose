require("dotenv/config");

const amqp = require("amqplib/callback_api");
const url = `amqp://localhost:${process.env.QUEUEPORT}`;
console.log(`Connecting on ${url}`);
amqp.connect(url, function(err, conn) {
  if (err) console.error("error", err);
  else
  conn.createChannel(function(err, ch) {
    const queue = "hello";
    ch.assertQueue(queue, { durable: false });
    ch.prefetch(1);
    console.log(`Listening queue ${queue}`);
    ch.consume(
      queue,
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
