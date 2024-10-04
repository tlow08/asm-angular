import mongoose from "mongoose";

// Destructure Schema from mongoose
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    currentBidPrice: {
      type: Number,
      default: 0,
    },
    currentBidder: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    bidTime: {
      type: Number,
    },
    bidPriceMax: {
      type: Number,
      default: 0,
    },
    bids: {
      type: [Schema.Types.ObjectId],
      ref: "Bid",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
