import { connectToDB } from "/dbconfig/dbconfig";


import {User} from "/models/userModel"
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    try {
        await connectToDB();
        const email=req.body.email;
        const pdf=req.body.pdf;
        const user = await User.findOneAndUpdate(
            { email: req.body.email },
            { $set: { pdf: pdf } }
          );
          console.log(user);
          
            res.status(200).json({message:"done"})
    }catch(error){
        res.status(500).json({error});
    }
    }