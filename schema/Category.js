import mongoose from "mongoose";

// Schema for Order
export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
