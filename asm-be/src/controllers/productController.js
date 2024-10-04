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

// export const updateProductById = async (req, res, next)=>{
//     try{

//         const {error} = productSchema.validate(req.body, {
//             abortEarly: false,
//         })
//         if(error){
//             const errors = error.details.map((err)=> err.message);
//             return res.status(400).json({
//                 message: errors,
//             })
//         }
//         const data = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         const updateCategory = await Category.findByIdAndUpdate(
//             req.body.category,
//             {
//                 $push: {products: data._id},
//             },
//             {new: true}
//         );
//         if(data && updateCategory){
//             return res.status(200).json({
//                 success: true,
//                 data,
//                 message: "Update product successfully!",
//             });
//         }
//     }catch(error){
//         next(error);
//     }
// }


// export const updateProductById = async (req, res, next) => {
//     try {
//       const { error } = productSchema.validate(req.body, { abortEarly: false });
//       if (error) {
//         const errors = error.details.map((err) => err.message);
//         return res.status(400).json({
//           message: errors,
//         });
//       }
  
//       const existingProduct = await Product.findById(req.params.id);
//       if (!existingProduct) {
//         return res.status(404).json({
//           message: "Product not found",
//         });
//       }
  
//       const auctionFields = {};
//       if (req.body.startAt) auctionFields.startAt = req.body.startAt;
//       if (req.body.endAt) auctionFields.endAt = req.body.endAt;
//       if (req.body.bidPriceMax) auctionFields.bidPriceMax = req.body.bidPriceMax;
  
//       const updatedData = { ...req.body, ...auctionFields };
  
//       const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
//       const updateCategory = await Category.findByIdAndUpdate(
//         req.body.category,
//         {
//           $push: { products: updatedProduct._id },
//         },
//         { new: true }
//       );
  
//       if (updatedProduct && updateCategory) {
//         return res.status(200).json({
//           success: true,
//           data: updatedProduct,
//           message: "Product updated successfully, including auction details!",
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };
  
export const updateProductById = async (req, res, next) => {
    try {
      const { error } = productSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      // Ensure startAt and endAt are converted to Date objects
      const auctionFields = {};
      if (req.body.startAt) auctionFields.startAt = new Date(req.body.startAt);
      if (req.body.endAt) auctionFields.endAt = new Date(req.body.endAt);
      if (req.body.currentBidPrice) auctionFields.currentBidPrice = req.body.currentBidPrice;
  
      const updatedData = { ...req.body, ...auctionFields };
  
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      // Update category reference if necessary
      if (req.body.category) {
        await Category.findByIdAndUpdate(
          req.body.category,
          {
            $addToSet: { products: updatedProduct._id }, // Use $addToSet to avoid duplicates
          },
          { new: true }
        );
      }
  
      if (updatedProduct) {
        return res.status(200).json({
          success: true,
          data: updatedProduct,
          message: "Product updated successfully!",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  
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