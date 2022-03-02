const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const HistorySchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User required!"]
    },
    products: {
      type: Array,
      default: null
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price required!"]
    }
  },
  { timestamps: true }
);
module.exports = Mongoose.model("history", HistorySchema);