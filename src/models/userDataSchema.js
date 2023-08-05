const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  totalcholesterol: {
    type: Number,
    default: 0,
  },
  hdlcholesterol: {
    type: Number,
    default: 0,
  },
  vldl: {
    type: Number,
    default: 0,
  },
  ldlcholesterol: {
    type: Number,
    default: 0,
  },
  nonhdlcholesterol: {
    type: Number,
    default: 0,
  },
  triglycerides: {
    type: Number,
    default: 0,
  },
  totalcholesterolhdlratio: {
    type: Number,
    default: 0,
  },
  tgratio: {
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
