const mongoose = require("mongoose");

const renewableSourceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  output: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("RenewableSource", renewableSourceSchema);
