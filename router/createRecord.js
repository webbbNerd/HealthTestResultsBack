const express = require("express");
const router = express.Router();
const UserData = require("../models/userDataSchema");

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.headers;

    return res.json({
      success: true,
      error: false,
      message: "Data found for user",
      data: await UserData.find({
        createdBy: userId,
      }),
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ data: null, success: false, error: true, message: err.message });
  }
});

router.get("/report/:id", async (req, res, next) => {
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
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ data: null, success: false, error: true, message: err.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.headers;

    const userData = new UserData({
      ...req.body,
      createdBy: userId,
    });

    const saved = await userData.save();

    return res.json({
      data: saved,
      message: `Document saved`,
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ data: null, success: false, error: true, message: err.message });
  }
});

router.put("/:id", async (req, res, next) => {
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
      message: `File updated successfully`,
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ data: null, success: false, error: true, message: err.message });
  }
});

router.delete("/:id", async (req, res, next) => {
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
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ data: null, success: false, error: true, message: err.message });
  }
});

module.exports = router;
