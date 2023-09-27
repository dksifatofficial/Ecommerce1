import mongoose from "mongoose";
import User from "./user";

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
    starRatings: [
      {
        revUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        starRating: Number,
        textReview: String,
      }
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;