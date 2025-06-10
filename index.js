// backend/index.js

import mongoose from "mongoose";
import express from "express";
import { CustomerRouter } from "./apis/customer.js";
import { OrderRouter } from "./apis/order.js";
import { CategoryRouter } from "./apis/category.js";

export const app = express();
app.use(express.json());
const PORT = 5000;

// Use routes
app.use("/customer", CustomerRouter);
app.use("/order", OrderRouter);
app.use("/category", CategoryRouter);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/records", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to yourDB-name database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

// Sample route to check if the backend is working
app.get("/", (req, resp) => {
  resp.send("App is working");
});

app.listen(PORT, () => {
  console.log(`server is runnig on port:${PORT}`);
});
