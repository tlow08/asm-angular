import Bid from "../models/BidsModel.js";
import Product from "../models/ProductModel.js";

export const createBid = async (req, res, next) => {
  try {
    const { product, user, startTime, endTime, price } = req.body;

    const productExists = await Product.findById(product);
    if (!productExists) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const newBid = await Bid.create({
      product,
      user,
      startTime,
      endTime,
      price,
    });

    return res.status(201).json({
      success: true,
      data: newBid,
      message: "Bid created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveBidsForProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const currentTime = new Date();
    const activeBids = await Bid.find({
      product: productId,
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    }).populate("user", "username");

    return res.status(200).json({
      success: true,
      data: activeBids,
      message: "Active bids fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateBid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { price, startTime, endTime } = req.body;

    const existingBid = await Bid.findById(id);
    if (!existingBid) {
      return res.status(404).json({ success: false, message: "Bid not found" });
    }

    const currentTime = new Date();
    if (existingBid.endTime < currentTime) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot update an expired bid" });
    }

    existingBid.price = price !== undefined ? price : existingBid.price;
    existingBid.startTime =
      startTime !== undefined ? new Date(startTime) : existingBid.startTime;
    existingBid.endTime =
      endTime !== undefined ? new Date(endTime) : existingBid.endTime; 

    const updatedBid = await existingBid.save(); 

    return res.status(200).json({
      success: true,
      data: updatedBid,
      message: "Bid updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};
