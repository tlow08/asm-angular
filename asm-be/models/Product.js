import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {type: String, require: true},
    description: {type: String},
    image: {type: String},
    price: {type: Number},
},{
    timestamps: true, versionKey:false
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;