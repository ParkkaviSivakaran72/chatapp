import chatterModel from "../models/chattersModel.js";

export const addChatter = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({ message: "Name and phone number are required." });
    }

    // Check if user already exists
    const existing = await chatterModel.findOne({ phoneNumber });
    if (existing) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Optional: Assign default image
    const newChatter = new chatterModel({
      name,
      phoneNumber
      
    });

    await newChatter.save();
    res.status(201).json(newChatter);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
