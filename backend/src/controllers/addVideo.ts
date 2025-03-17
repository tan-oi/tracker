import { Request, Response } from "express";
import { Contest } from "../schema/questions";

export async function addVideo(req:Request,res:Response){
    const {videoLink, contestId} = req.body

    try {
        const updateData = await Contest.findByIdAndUpdate(
            contestId, 
            {
                videoLink
            },
            {new : true}
        )  
        
        if (!updateData) {
            res.status(404).json({ 
             success : false,  
                 error: "Something gone wrong" });
                 return;
         }

         res.status(200).
         json({
            success : true,
            message : "video added"
          })
          return;
        
    }
    catch(err) {
        res.status(500).json({
            success : false,
            error : "Internal server error"
        })
    }
}