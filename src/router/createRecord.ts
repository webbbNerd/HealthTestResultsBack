const express = require("express");
const router = express.Router();
const UserData = require("../models/userDataSchema");
import { CustomResponse } from "../../types";
import { Request, Response, NextFunction } from "express";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.headers;

    const response: CustomResponse = {
      success: true,
      error: false,
      message: "Data found for user",
      data: await UserData.find({
        createdBy: userId,
      }),
    };

    return res.json(response);
  } catch (err: unknown) {
    next(err);
  }
});

router.get(
  "/report/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataId = req.params.id;

      const savedData = await UserData.findById(dataId);

      if (!savedData)
        return res.status(404).json({
          data: null,
          success: false,
          error: true,
          message: "Document not found",
        });

      return res.json({
        success: true,
        error: false,
        message: "Data found for user",
        data: savedData,
      });
    } catch (err: unknown) {
      next(err);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.headers;

    const userData = new UserData({
      ...req.body,
      createdBy: userId,
    });

    const saved = await userData.save();

    return res.json({
      data: saved,
      message: "Document saved",
      error: false,
      success: true,
    });
  } catch (err: unknown) {
    next(err);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataId = req.params.id;
    const savedData = await UserData.findById(dataId);

    if (!savedData)
      return res.status(404).json({
        data: null,
        success: false,
        error: true,
        message: "Document not found",
      });

    const updated = await savedData.updateOne({
      $set: {
        ...req.body,
      },
    });

    return res.json({
      data: updated,
      message: "File updated successfully",
      error: false,
      success: true,
    });
  } catch (err: unknown) {
    next(err);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataId = req.params.id;
      const savedData = await UserData.findById(dataId);
      if (!savedData)
        return res.status(404).json({
          data: null,
          success: false,
          error: true,
          message: "Document not found",
        });
      const deleted = await UserData.findByIdAndDelete(dataId);
      return res.json({
        data: deleted,
        message: "Data deleted successfully",
        error: false,
        success: true,
      });
    } catch (err: unknown) {
      next(err);
    }
  }
);

module.exports = router;
