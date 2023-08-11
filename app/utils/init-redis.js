const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => {
  console.log("connect to redis");
});
redisClient.on("error", (err) => {
  console.log("RedisError: ", err.message);
});
redisClient.on("connected", () => {
  console.log("connected to redis and  redy to use...");
});
redisClient.on("end", () => {
  console.log("disconnect from redis...");
});

module.exports = redisClient