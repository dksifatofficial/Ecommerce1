import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import StarRating from "@/models/starRating";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewReviewSchema = Joi.object({
  starRatingNumber: Joi.number().required(),
  reviewImageUrl: Joi.string().required(),
  writtenReview: Joi.string().required(),
  selectDescriptions: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    console.log(isAuthUser, "sifat");

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();

      const {
        starRatingNumber,
        reviewImageUrl,
        writtenReview,
        selectDescriptions,
      } = extractData;

      const { error } = AddNewReviewSchema.validate({
        starRatingNumber,
        reviewImageUrl,
        writtenReview,
        selectDescriptions,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await StarRating.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Review giving successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to giving review ! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You have not purchased this product !",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
