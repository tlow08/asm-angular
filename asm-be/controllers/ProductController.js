import Product from "../models/Product.js";

class ProductController{
    async getList(req, res){
        try{
            const products = await Product.find();
            res.status(200).json({
                message: "Lay danh sach thanh cong!",
                data: products,
            })
        }catch(error){
            res.status(400).json({
                message: error.message,
            })
        }
    }

    async getDetail(req, res){
        try{
            const id = req.params.id;
            const product= await Product.findById(id);
            if(!product){
                return res.status(404).json({
                    message: "ko tim thay san pham"
                })
            }

            res.status(200).json({
                message: "thanh cong",
                data: product,
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default ProductController;