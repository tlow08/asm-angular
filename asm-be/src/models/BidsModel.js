import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
  },
  bidAmount: {
      type: Number,
      required: true
  },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Bid", bidSchema);
