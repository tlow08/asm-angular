import mongoose from "mongoose";

async function connectMongoDB(dbUrl){
    try{
        await mongoose.connect(dbUrl);
        console.log("connect successfully!");
    }catch(error){
        console.log("connect failure!");
    }
}

export default connectMongoDB