import jwt from "jsonwebtoken";

type JwtPayload = Record<string, unknown>;

const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

export default generateToken;
