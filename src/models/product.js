import mongoose from "mongoose";

// const ratingSchema = new mongoose.Schema(
//   {
//     whoGiveRev: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "reviewUserID", // Reference to the user who gave the rating
//     },
//     starRating: {
//       type: Number,
//     },
//     textReview: {
//       type: String,
//     },
//   },
//   { _id: false } // Don't auto-generate _id for individual ratings
// );

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
    tags: Array,
    quantity: Number,
    itemCode: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;

// reviewsCount: {
//   type: Number,
//   default: 0,
// },
