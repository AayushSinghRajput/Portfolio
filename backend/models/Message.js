
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 150,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxlength: 254,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;
