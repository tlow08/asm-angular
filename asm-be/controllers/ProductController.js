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
}

export default ProductController;