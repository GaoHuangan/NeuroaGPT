import mongoose, { Document, Model, Schema } from "mongoose";

// 消息子文档的接口
export interface IMessage {
  isImage: boolean;
  isPublished: boolean;
  role: string;
  content: string;
  timestamp: number;
}

// Chat 文档接口
export interface IChat extends Document {
  userId: string;       // 关联 User
  userName: string;
  name: string;
  messages: IMessage[];
}

// 定义 Schema
const messageSchema = new Schema<IMessage>(
  {
    isImage: { type: Boolean, required: true },
    isPublished: { type: Boolean, default: false },
    role: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Number, required: true },
  },
  { _id: false } // 子文档不需要 _id
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

// 模型
const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
