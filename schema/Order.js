import mongoose from "mongoose";

// Schema for Order
export const OrderSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  bookID: {
    type: String,
    required: true,
  },
  initialDate: {
    type: Date,
    default: new Date(),
  },
  deliveryDate: {
    type: Date,
    default: new Date(),
  },
});
