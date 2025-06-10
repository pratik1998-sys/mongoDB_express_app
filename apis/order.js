import express from "express";
import mongoose from "mongoose";
import { OrderSchema } from "../schema/Order.js";

export const OrderRouter = express.Router();

const Order = mongoose.model("orders", OrderSchema);

// 1. Register an order
OrderRouter.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    let result = await order.save();
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("order already placed");
      res.status(400).send("order already placed");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. find an order
OrderRouter.get("/:orderId", async (req, res) => {
  try {
    const result = await Order.find({
      _id: req.params.orderId.toString(),
    });
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("order does not exist");
      res.status(400).send("order does not exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 3. delete an order
OrderRouter.delete("/:orderID", async (req, res) => {
  try {
    const result = await Order.findOneAndDelete({
      _id: req.params.orderID.toString(),
    });
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("order does not exist");
      res.status(400).send("order does not exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. get all orders
OrderRouter.get("/", async (req, res) => {
  try {
    const result = await Order.find();
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("error fetching orders");
      res.status(400).send("error feching orders");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});
