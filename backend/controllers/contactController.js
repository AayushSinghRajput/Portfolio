
import Message from "../models/Message.js";


export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please provide name, email and message." });
    }

    // Extra lightweight validation for email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const newMessage = await Message.create({ name, email, message });

    return res.status(201).json({
      message: "Message received successfully.",
      data: { id: newMessage._id, createdAt: newMessage.createdAt },
    });
  } catch (err) {
    console.error("Error saving message:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
