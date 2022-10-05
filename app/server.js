const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

module.exports = class Application {
  #app = express();
  #Db_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#Db_URI = DB_URI;
    this.configApplication();
    this.connectToMongoDb();
    this.createServer();
    this.createRoute();
    this.errorHandling();
  }
  configApplication() {
    console.log(1, true);
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    console.log("server");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("running => http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDb() {
    console.log("mongo");
    mongoose.connect(this.#Db_URI, (error) => {
      if (!error) return console.log("connect to mongoDB");
      return console.log("error to connect mongo db");
    });
  }
  createRoute() {}
  errorHandling() {
    this.#app.use((req, res) => {
      return res.json({
        satatusCode: 404,
        message: "صفحه مورد نظر یافت نشد!",
      });
    });
    this.#app.use((error, req, res) => {
      const satatusCode = error.satsus || 500;
      const message = error.message || "Interal Server Error";
      return res.satsus(satatusCode).json({
        satatusCode,
        message,
      });
    });
  }
};
