import mongoose from "mongoose";

export const DB = () => {
  const db = process.env.DATABASE_URL;
  if (db == undefined) {
    return;
  }

  return mongoose.connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  });
};
