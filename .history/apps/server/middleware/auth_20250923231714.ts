import jwt from "jsonwebtoken";
import User from "../models/User";
import { NextFunction } from "express";
import { Request, Response } from "express";
import AppError from "../utils/appError";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    
    let token = req.headers.authorization;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);

        if(!user) {
            return next(new AppError("Not authorized to access this route", 401));
        }

        req.user = user;
        next();
        
    } catch (error) {
        return next(new AppError("Not authorized to access this route", 401));
    }
}