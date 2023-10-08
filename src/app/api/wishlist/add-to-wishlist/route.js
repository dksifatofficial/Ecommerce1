import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Wishlist from "@/models/wishlist";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToWishlist = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const {productID , userID} = data;

      const { error } = AddToWishlist.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      console.log(productID, userID);

      const isCurrentWishlistItemAlreadyExists = await Wishlist.find({
        productID: productID,
        userID: userID,
      });

      console.log(isCurrentWishlistItemAlreadyExists);
      

      if (isCurrentWishlistItemAlreadyExists?.length > 0) {
        return NextResponse.json({
          success: false,
          message:
            "Product is already added in Wishlist! Please add different product",
        });
      }

      const saveProductToWishlist = await Wishlist.create(data);

      console.log(saveProductToWishlist);

      if (saveProductToWishlist) {
        return NextResponse.json({
          success: true,
          message: "Product is added to Wishlist !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add the product to Wishlist ! Please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
