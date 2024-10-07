import Bid from "../models/BidsModel.js";
import Product from "../models/ProductModel.js";

export const getBidsForProduct = async (req, res) => {
  try {
    const bids = await Bid.find({ productId: req.params.productId }).populate('userId', 'email');
    if (!bids) {
      return res.status(404).json({ message: 'Không tìm thấy giá thầu cho sản phẩm này'});
    }
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const placeBid = async (req, res) => {
  const { productId, bidAmount } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const currentTime = new Date();
    if (!product.startAt || !product.endAt || currentTime < product.startAt || currentTime > product.endAt) {
      return res.status(400).json({ message: 'Không được phép đấu thầu ngoài khung thời gian đấu giá.' });
    }

    if (bidAmount <= product.currentBidPrice) {
      return res.status(400).json({ message: 'Số tiền đấu thầu phải lớn hơn giá thầu hiện tại'});
    }

    const newBid = new Bid({
      userId: req.userId,
      productId,
      bidAmount
    });

    await newBid.save();
    product.currentBidPrice = bidAmount;
    await product.save();

    return res.status(200).json({ message: 'Đã đặt giá thầu thành công', bid: newBid });
  } catch (error) {
    console.error(error.message); 
    return res.status(500).json({ message: error.message });
  }
};
