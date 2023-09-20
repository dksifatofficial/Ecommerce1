import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const { productId, userId, rating } = req.body; // Assuming these fields are sent in the request body

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Product not found",
      });
    }

    // Check if the user has already rated this product and update the rating
    const existingRatingIndex = product.starRatings.findIndex(
      (ratingObj) => ratingObj.user.toString() === userId
    );

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      product.starRatings[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating
      product.starRatings.push({ user: userId, rating });
    }

    // Recalculate the average rating based on all ratings
    const totalRatings = product.starRatings.length;
    const totalRatingSum = product.starRatings.reduce(
      (sum, ratingObj) => sum + ratingObj.rating,
      0
    );
    const averageRating = totalRatingSum / totalRatings;

    // Update the reviews count
    product.reviewsCount = totalRatings;

    // Save the updated product
    await product.save();

    return NextResponse.json({
      success: true,
      message: 'Rating updated successfully',
      averageRating,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
