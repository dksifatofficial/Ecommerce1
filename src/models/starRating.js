import mongoose from "mongoose";

// const ratingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     rating: {
//       type: Number,
//     },
//   },
//   { _id: false }
// );

const StarRatingSchema = new mongoose.Schema(
  {
    starRatingNumber: Number,
    reviewImageUrl: String,
    writtenReview: String,
    selectDescriptions: String,
  },
  { timestamps: true }
);

const StarRating =
  mongoose.models.StarRating || mongoose.model("StarRating", StarRatingSchema);

export default StarRating;
