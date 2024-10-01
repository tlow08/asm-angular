import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import { productSchema } from './../validSchema/productSchema.js';

export const getAllProducts = async (req, res, next)=>{
    try{
        const data = await Product.find().populate("category");
        if(data){
            return res.status(200).json({
                success: true,
                data,
                message: "Get all products successfully"
            });
        }
    }catch(error){
        next(error);
    }
};

export const getProductById = async (req, res, next)=>{
    try{
        const data = await Product.findById(req.params.id);
        if(data){
            return res.status(200).json({
                success: true,
                data,
                message: "Search product id successfully",
            });
        }
    }catch(error){
        next(error);
    }
}

export const createProduct = async (req, res, next)=>{
    try{
        const {error} = productSchema.validate(req.body,{
            abortEarly: false,
        });
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const data = await Product.create(req.body);
        const updateCategory = await Category.findByIdAndUpdate(
            req.body.category,
            {
                $push: {products: data._id},
            },
            {new: true}
        );
        if(data && updateCategory){
            return res.status(201).json({
                success: true,
                data,
                message: "Create product successfully!",
            });
        }
    }catch(error){
        next(error);
    }
}

export const updateProductById = async (req, res, next)=>{
    try{

        const {error} = productSchema.validate(req.body, {
            abortEarly: false,
        })
        if(error){
            const errors = error.details.map((err)=> err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const data = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const updateCategory = await Category.findByIdAndUpdate(
            req.body.category,
            {
                $push: {products: data._id},
            },
            {new: true}
        );
        if(data && updateCategory){
            return res.status(200).json({
                success: true,
                data,
                message: "Update product successfully!",
            });
        }
    }catch(error){
        next(error);
    }
}

export const removeProductById = async (req, res, next) =>{
    try{
        const data = await Product.findByIdAndDelete(req.params.id);
        if(data){
            return res.status(200).json({
                success: true,
                data, 
                message: "Remove product successfully!",
            });
        }
    }catch(error){
        next(error);
    }
}