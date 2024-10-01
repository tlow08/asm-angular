import slugify from "slugify";
import Category from "../models/CategoryModel.js";
import { categorySchema } from './../validSchema/categorySchema.js';

export const getAllCategories = async (req, res, next) =>{
    try{
        const data = await Category.find();
        if(data){
            return res.status(200).json({
                success: true,
                data, 
                message: "Get all categories successfully!", 
            })
        }
    }catch(error){
        next(error);
    }
}

export const createCategory = async (req, res, next) => {
    try{
        const {error} = categorySchema.validate(req.body, {
            abortEarly: false,
        });
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const slug = slugify(req.body.title, {
            replacement: "-",
            lower: true,
            strict: true,
            locale: "vi",
            trim: true,
        });
        // console.log(slug);
       
        const data = await Category.create({...req.body, slug});
        if(data){
            return res.status(201).json({
                success: true,
                data,
                message: "create successfully!",
            })
        }
    }catch(error){
        next(error);
    }
}

export const getCategoryById = async (req, res, next) =>{
    try{
        const data = await Category.findById(req.params.id).populate("products");
        if(data){
            return res.status(200).json({
                success: true,
                data,
                message: "search category id successfully!",
            });
        }
    }catch(error){
        next(error);
    }
}

export const updateCategoryById = async (req, res, next) => {
    try{
        const {error} = categorySchema.validate(req.body, {
            abortEarly: false,
        });
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const data = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(data){
            return res.status(200).json({
                success: true,
                data,
                message: "Update category successfully!",
            })
        }
    }catch(error){
        next(error);
    }
}

export const removeCategoryById = async (req, res, next) => {
    try{
        const data = await Category.findByIdAndDelete(req.params.id);
        if(data){
            return res.status(200).json({
                success: true,
                message: "Delete category successfully!",
            });
        }else{
            return res.status(404).json({
                success: false,
                message: "Not found category!",
            });
        }
    }catch(error){
        next(error);
    }
}