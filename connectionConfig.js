const fs = require("fs");

//module.exports = {
//    user: "candidate",
//    password: "62I8anq3cFq5GYh2u4Lh",
//    host: "rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net",
//    port: 6432,
//    database: "db1",
//    ssl: {
//      rejectUnauthorized: true,
//      ca: fs.readFileSync("./root.crt").toString(),
//    },
//  };

module.exports = {
  user: "daniil",
  password: "m7zym2vs",
  host: "localhost",
  port: 5432,
  database: "mybase",
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./root.crt").toString(),
  },
};
