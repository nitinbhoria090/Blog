import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt, { decode } from "jsonwebtoken";
import getDataUri from "../Utils/dataUri.js";
import cloudinary from "../Utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required"
      })
    }
    const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegax.test(email)) {
      return res.status(400).json({
        success: false,
        message: "invalid email"
      })

    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "please enter password must be atleast 6 characters"
      })
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "email already exist"
      })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword
    })

    return res.status(201).json({
      success: true,
      message: "account created successfully"
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: "failed to register"
    })

  }
}


export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }
    let user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password "
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.status(400).json({
        success: false,
        message: "Invalid credientals"
      })
    }

    const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:"1d"})
    return res.status(200).cookie("token",token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: "lax", secure: false}).json({
      success: true,
      message: `Welcome back ${user.firstName}`,
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to login"
    })

  }
}

export  const logout = async(_, res)=>{
  try {
    return res.status(200).cookie("token", "", {maxAge: 0}).json({
    message: "logout successfully",
    success: true
    })
  } catch (error) {
    console.log(error);
    
  }
}


export const updateProfile = async(req, res)=>{
  try {
    
    const userId = req.id
    const {firstName, lastName, occupation, bio, instagram, facebook, linkedin, github} = req.body;
    const file = req.file;
 
    const fileUri = getDataUri(file)
    let cloudResponse = await cloudinary.uploader.upload(fileUri)
     console.log(cloudResponse);
    

    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({
        message:"User not Found",
        success: false
      })
    }
    //updating files
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(occupation) user.occupation = occupation
    if(instagram) user.instagram = instagram
    if(facebook) user.facebook = facebook
    if(linkedin) user.linkedin = linkedin
    if(github) user.github = github
    if(bio) user.bio  = bio
    if(file) user.photoUrl = cloudResponse.secure_url

    await user.save()

    return res.status(200).json({
      message: "Profile updated Successfully",
      success: true,
      user 
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:"Failed to update profile"
    })
  }
} 

export const getAllUsers = async (req,res) =>{
  try {
    const  users = await User.find().select("-password")
    res.status(200).json({
      success: true,
      message: "User list Fetched successfully",
      total: users.length,
      users
    })
  } catch (error) {
    console.log("Error fetching user List", error);
    res.status(500).json({
      success:false,
      message:"failed to fetch users"
    })
    
  }
}
