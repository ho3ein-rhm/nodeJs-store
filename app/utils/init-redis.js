const redisDB = require("redis");
const redisClient = redisDB.createClient({
  socket:{
    host: '127.0.0.1',
    port: '6363'
  }
});
redisClient.connect();
redisClient.on("connect", () => {
  console.log("connect to redis");
});
redisClient.on("error", (err) => {
  console.log("RedisError: ", err.message);
});
redisClient.on("ready", () => {
  console.log("connected to redis and  ready to use...");
});
redisClient.on("end", () => {
  console.log("disconnect from redis...");
});

module.exports = redisClient