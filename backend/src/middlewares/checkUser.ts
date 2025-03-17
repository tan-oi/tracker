import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authenticateToken(req:Request, res:Response, next:NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
             res.status(401).json({
                success: false,
                error: "Unauthenticated",
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
             res.status(401).json({
                success: false,
                error: "Not allowed, authenticate yourself",
            });
            return;
            
        }

        
       
        next(); 
    } catch (err) {
         res.status(403).json({
            success: false,
            error: "Invalid or expired token",
        });
        return;
    }
}
