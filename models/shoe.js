const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  name: { type: String, required: true },
  images: { type: Array, required: true },
  price: {type: String, required: true},
  synopsis: String,
  sizes:{type: Array, required:true},
  brand: {type: String, required: true},
  date: { type: Date, default: Date.now }
});

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
