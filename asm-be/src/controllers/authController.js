import User from "../models/UserModel.js";
import { authSchema } from "../validSchema/authSchema.js";
import bcryptjs from 'bcryptjs'; // Corrected import
import jwt from 'jsonwebtoken'; 

export const register = async (req, res, next)=>{
    try{
        const {error} = authSchema.validate(req.body,{
            abortEarly: false,
        });
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const {email, password} = req.body;
        const useExists = await User.findOne({email});

        if(useExists){
            return res.status(400).json({
                message: "Email da ton tai",
            })
        }
        const hashPass = await bcryptjs.hash(password, 10);
        if(!hashPass){
            return res.status(400).json({
                message: "Ma hoa mat khau khong thanh cong",
            });
        }
        const user = await User.create({
            email,
            password: hashPass,
        });

        user.password = undefined;
        return res.status(201).json({
            success: true,
            data: user,
            message: "dang ky thanh cong",
        });
    }catch(error){
        next(error);
    }
};

export const login = async (req, res, next)=>{
    try{

        const {error} = authSchema.validate(req.body,{
            abortEarly: false,
        });

        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        
        const {email, password} = req.body;
        const useExists =  await User.findOne({email});
        if(!useExists){
            return res.status(404).json({
                message: "Email chua dc dang ky",
            });
        }

        const isMAtch = await bcryptjs.compare(password, useExists.password);
        if(!isMAtch){
            return res.status(400).json({
                message: "ko chinh xac",
            });
        }

        const token = jwt.sign({_id: useExists._id},'asm-angular', {expiresIn: "100d"});
        useExists.password = undefined;

        return res.status(200).json({
            success: true,
            user: useExists,
            accessToken: token,
            message: "Login successfully"
        })
    }catch(error){
        next(error);
    }
};