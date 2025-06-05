import express from "express";
import mongoose from "mongoose";
import { CustomerSchema } from "../schema/customer.js";

export const CustomerRouter = express.Router();

const Customer = mongoose.model("customers", CustomerSchema);

// 1. Register an customer
CustomerRouter.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    console.log(customer);
    let result = await customer.save();
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("Customer already registered");
      res.status(400).send("Customer already registered");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. find a customer
CustomerRouter.get("/:name", async (req, res) => {
  try {
    const result = await Customer.find({
      name: req.params.name.toString(),
    });
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("Customer does not exist");
      res.status(400).send("Customer does not exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 3. delete a customer
CustomerRouter.delete("/:name", async (req, res) => {
  try {
    const result = await Customer.findOneAndDelete({
      name: req.params.name.toString(),
    });
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("Customer does not exist");
      res.status(400).send("Customer does not exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. get all customers
CustomerRouter.get("/", async (req, res) => {
  try {
    const result = await Customer.find();
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("error fetching customers");
      res.status(400).send("error feching customers");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});
