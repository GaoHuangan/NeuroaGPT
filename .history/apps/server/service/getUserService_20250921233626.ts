import User from "../models/User";
import AppError from "../utils/appError";
import { GetUserDTO } from "../dao/getUser.dto";

export const getUserService = async (getUserDTO: GetUserDTO) => {
  const user = await User.findOne({ email: getUserDTO.email }).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
