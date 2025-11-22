import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: Number,
    },
  ],
  total: Number,
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Order", orderSchema);
