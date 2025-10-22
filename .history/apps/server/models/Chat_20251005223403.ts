import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IMessage {
  isImage: boolean;
  isPublished: boolean;
  role: string;
  content: string;
  timestamp: number;
}

export interface IChat extends Document {
  userId: string;
  userName: string;
  name: string;
  messages: Types.DocumentArray<IMessage>;  // <-- Use DocumentArray type
}

const messageSchema = new Schema<IMessage>(
  {
    isImage: { type: Boolean, required: true },
    isPublished: { type: Boolean, default: false },
    role: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Number, required: true },
  },
  { _id: false }
);

const chatSchema = new Schema<IChat>(
  {
    userId: { type: String, ref: "User", required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
