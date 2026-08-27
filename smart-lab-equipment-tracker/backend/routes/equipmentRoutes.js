const express = require("express");
const router = express.Router();

const Equipment = require("../models/Equipment");

// GET all equipment
router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch equipment",
      error: error.message,
    });
  }
});

// POST new equipment
router.post("/", async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);

    const savedEquipment = await newEquipment.save();

    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add equipment",
      error: error.message,
    });
  }
});

// PUT update equipment
router.put("/:id", async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEquipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    res.json(updatedEquipment);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update equipment",
      error: error.message,
    });
  }
});

// DELETE equipment
router.delete("/:id", async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedEquipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    res.json({
      message: "Equipment deleted successfully",
      equipment: deletedEquipment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete equipment",
      error: error.message,
    });
  }
});

module.exports = router;