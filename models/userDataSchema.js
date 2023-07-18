const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  totalCholesterol: {
    type: Number,
    default: 0,
  },
  hdlCholesterol: {
    type: Number,
    default: 0,
  },
  vldl: {
    type: Number,
    default: 0,
  },
  ldlCholesterol: {
    type: Number,
    default: 0,
  },
  nonHdlCholesterol: {
    type: Number,
    default: 0,
  },
  triGlycerides: {
    type: Number,
    default: 0,
  },
  totalCholesterolHdlRatio: {
    type: Number,
    default: 0,
  },
  tgRatio: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const UserData = mongoose.model("USERS_DATA", userDataSchema);

module.exports = UserData;
