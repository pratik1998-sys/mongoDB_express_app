import express from "express";
import mongoose from "mongoose";
import { CategorySchema } from "../schema/Category.js";

export const CategoryRouter = express.Router();

const Category = mongoose.model("categories", CategorySchema);

// 1. Add new category
CategoryRouter.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    let result = await category.save();
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("category already exist");
      res.status(400).send("category already exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. find a category
CategoryRouter.get("/:categoryId", async (req, res) => {
  try {
    const result = await Category.find({
      _id: req.params.categoryId.toString(),
    });
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("category does not exist");
      res.status(400).send("category does not exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 3. delete a category
CategoryRouter.delete("/:categoryID", async (req, res) => {
  try {
    const result = await Category.findOneAndDelete({
      _id: req.params.categoryID.toString(),
    });
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("category does not exist");
      res.status(400).send("category does not exist");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. get all categories
CategoryRouter.get("/", async (req, res) => {
  try {
    const result = await Category.find();
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("error fetching categories");
      res.status(400).send("error feching categories");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});

// 2. update category
CategoryRouter.put("/:categoryID", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const result = await Category.findByIdAndUpdate(
      req.params.categoryID,
      req.body,
      { newCategory: true, runValidators: true }
    );
    if (result) {
      res.status(201).send(result);
    } else {
      console.log("error fetching category");
      res.status(400).send("error feching category");
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: err.message });
  }
});
