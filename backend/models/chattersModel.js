// models/chatterModel.js
const mongoose = require("mongoose");

const chatterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String
  },
}, {
  timestamps: true,
});

chatterModel= mongoose.models.Chatter || mongoose.model("Chatter", chatterSchema);

export default chatterModel;
