import { Users, validationUser } from "../schema/userSchema.js";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, skip = 1 } = req.query;
    const users = await Users.find()
      .limit(limit)
      .select("-password")
      .skip(limit * (skip - 1));
    if (!users.length) {
      return res.status(400).json({
        msg: "Users is not defined",
        variant: "warning",
        payload: null,
      });
    }
    const total = await Users.countDocuments();
    res.status(200).json({
      msg: "All Users",
      variant: "success",
      payload: users,
      total,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    let { error } = validationUser(req.body);
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
        variant: "error",
        payload: null,
      });
    }
    const existUSser = await Users.exists({ title: req.body.username });
    if (existUSser) {
      return res.status(400).json({
        msg: "This username has been used",
        variant: "warning",
        payload: null,
      });
    }
    const user = await Users.create(req.body);
    res.status(201).json({
      msg: "User is created",
      variant: "success",
      payload: user,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existUser = await Users.findById(id);
    if (!existUser) {
      return res.status(400).json({
        msg: "User is not defined",
        variant: "warning",
        payload: null,
      });
    }
    const user = await Users.findByIdAndDelete(id, { new: true });

    res.status(200).json({
      msg: "user is deleted",
      variant: "success",
      payload: user,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      msg: "User is updated",
      variant: "success",
      payload: user,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});

export default router;
