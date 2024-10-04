import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    // isWinBid:{
    //   type: Boolean,
    //   default: false,
    // }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Bid", bidSchema);
