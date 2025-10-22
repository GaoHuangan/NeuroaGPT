import mongoose, { Document, Model, Schema } from "mongoose";

// 定义用户文档的 TypeScript 接口
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  credits: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 定义 schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // 建议加 unique
  password: { type: String, required: true, select: true },
  credits: { type: Number, default: 20 },
});

// 只负责定义数据结构，不做复杂逻辑
// 逻辑（比如 hash、compare）我们抽到 utils/service
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
