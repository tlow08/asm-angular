import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        price:{
            type:Number,
            required: true,
        },
        description:{
            type: String,
            default: "",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }, 
        image: {
            type: String,
            default: "",
        }
    },
    {timestamps: true, versionKey: false}
);

export default mongoose.model("Product", productSchema);
