import mongoose from "mongoose";
import Product from "./product";
import User from "./user";

const StarRatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rateProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    starRatings: [
      {
        starRating: { type: String, required: true },
        textReview: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const StarRating =
  mongoose.models.StarRating || mongoose.model("StarRating", StarRatingSchema);

export default StarRating;