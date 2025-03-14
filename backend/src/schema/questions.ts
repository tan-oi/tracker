import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    platform : {
        type : String,
        required : true
    },
    
       startTime : {
        type : String,
        required : true
       }
       
    ,
    status : {
        type : String,
        enum : ["UPCOMING", "PAST"]
    }
})


export const Contest = mongoose.model("Contet",contestSchema);