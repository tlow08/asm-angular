import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const CheckAuth = async (req, res, next)=>{
  try{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({
        message: "User chua dang nhap"
      })
    }

    const data = jwt.verify(token, 'asm-angular');
    if(!data){
      return res.status(401).json({
        message: "thong tin user ko hop le",
      })
    }

    const user = await User.findById(data._id);
    if(!user){
      return res.status(401).json({
        message: "User ko hop le",
      })
    }
    req.userId = user._id; 
    next();
  }catch(error){
    res.status(400).json({
      message: error.message
    })
  }
}

export {CheckAuth}