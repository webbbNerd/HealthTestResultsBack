const mongoose = require("mongoose");

const DB = () => {
  const db = process.env.DATABASE_URL;

  return mongoose.connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  });
};

module.exports = DB;
