import { Router } from "express";
import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const router = Router();


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        
       
        message: "All fields required" 
           
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({

      message: "User already exists" 
        
      });
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ 
    message: "Signup failed" 
    });
  }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({

      message: "All fields required" 
         
         });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        
        message: "Invalid credentials" 

        });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(400).json({ 
        message: "Invalid credentials" 
        });
    }

    const token = generateToken(user._id.toString());

    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
