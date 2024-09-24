import User from "../models/User.js";
import { loginValidator, registerValidator } from "../validations/auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
class AuthController{
    async registerUser(req, res){
        const {error} = registerValidator.validate(req.body, {
            abortEarly: false
        });
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const { email, password} = req.body;

        const existedEmail = await User.findOne({email});
        if(existedEmail){
            return res.status(400).json({
                message: "Email da dc su dung"
            })
        }
        const hashedPass = await bcryptjs.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPass
        });
        
        res.status(201).json({
            message: "Dang ky thanh cong",
            data: user
        })
    }

    async loginUser(req, res){
        const {error} = loginValidator.validate(req.body,{
            abortEarly:false
        });
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!User){
            return res.status(404).json({
                message: "Email ko ton tai",
            })
        }

        const checkPass = await bcryptjs.compare(password, user.password);
        if(!checkPass){
            return res.status(400).json({
                message: "Thong tin khong chinh xac",
            })
        }
        const token = jwt.sign({ id: user.id }, 'tutorWeb503', { expiresIn: "1d" });
        res.status(200).json({
            message: "Dang nhap thanh cong",
            data: user,
            token,
        })
    }
}
export default AuthController;