import mongoose from "mongoose";

// Schema for employees of the app
export const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});
