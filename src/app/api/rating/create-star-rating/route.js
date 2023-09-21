import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import StarRating from "@/models/starRating";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();

      const saveNewRating = await StarRating.create(data);

      if (saveNewRating) {
        return NextResponse.json({
          success: true,
          message: "Review successful!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to create a review ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authticated",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
