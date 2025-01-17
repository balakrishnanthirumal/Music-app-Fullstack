import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    reciverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
