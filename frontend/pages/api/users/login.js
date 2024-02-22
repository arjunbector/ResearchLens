import { connectToDB } from "/dbconfig/dbconfig.js";


import {User} from "/models/userModel.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



export default async function handler(req, res) {
    try {
        await connectToDB();
        
        const { email, password } = req.body;
        console.log(req.body);

      
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ error: 'Something went wrong1' });
        }
        console.log("User exists");
        
        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return res.status(500).json({ error: 'Something went wrong2' });
        }
        console.log(user);
        
        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        // Create token
        const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        res.status(200).json({
            message: 'Login successfull',
          });
        res.cookies.set("token", token, {
            httpOnly: true
        });
        return res;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong3' });
    }
}