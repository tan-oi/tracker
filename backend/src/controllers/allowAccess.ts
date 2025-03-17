import { Request, Response } from "express";
import jwt from "jsonwebtoken"
export async function allowAccess(req:Request, res:Response) {
    const secret = process.env.SECRET_CODE!;
    const { secretCode } = req.body;
    if(!secretCode) {
        res.status(404).
        json({
            success : false,
            error : "missing code!"
        })
        return;
    }
    try {
    if(secretCode === process.env.VIDEO_AUTH_CODE){
        const token = jwt.sign({secretCode}, secret );
        res.status(200).
        json({
            success : true,
            message : "Access gained",
            token
          })
          return;

    }
    else{
        res.status(401).
        json({
            success : false,
            error : "Access denied, wrong code!"
        })
    }
    }
    catch(err) {
            res.status(500)
            .json({
                success : false,
                error : "Internal server error"
            })
    }
    
    

}