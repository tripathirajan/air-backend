const mongoose = require("mongoose");
var logger = require("debug")("air-backend:db-connect");

const { db: dbOptions } = require("../config");

const { username, password, db, host, port, ...rest } = dbOptions;
const dbURI = `mongodb://${username}:${password}@${host}:${port}/${db}`;

const initDBConnection = async () => {
  try {
    await mongoose.connect(dbURI, { ...rest });
  } catch (err) {
    return logger(
      "Unable to connect db with options:" + JSON.stringify(dbOptions)
    );
  }
  logger(
    "DB connection established with uri:" +
      `mongodb://${username}:****@${host}:${port}/${db}`
  );
};

module.exports = initDBConnection;
