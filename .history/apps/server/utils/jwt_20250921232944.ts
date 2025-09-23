import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

const generateToken = (
  payload: JwtPayload,
  expiresIn: string | number = "30d"
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export default generateToken;
