//add a new product service

import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch(
      "https://raiment-gallery-ecommerce.vercel.app/api/admin/all-products",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllPremiumProduct = async () => {
//   try {
//     const res = await fetch("https://raiment-gallery-ecommerce.vercel.app/api/premium/all-products", {
//       method: "GET",
//       cache: "no-store",
//     });

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateAProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateStarRatings = async (formData) => {
  try {
    const response = await fetch("/api/update-review", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// body: JSON.stringify({
//   starRatings: formData,
// }),

export const updateAReview = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-review", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByCategory = async (id) => {
  try {
    const res = await fetch(
      `https://raiment-gallery-ecommerce.vercel.app/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByTags = async (id) => {
  try {
    const res = await fetch(
      `https://raiment-gallery-ecommerce.vercel.app/api/admin/product-by-tags?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByLowPrice = async (id) => {
  try {
    const res = await fetch(
      `https://raiment-gallery-ecommerce.vercel.app/api/admin/product-by-low-price?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productById = async (id) => {
  try {
    const res = await fetch(
      `https://raiment-gallery-ecommerce.vercel.app/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await fetch(
      `https://raiment-gallery-ecommerce.vercel.app/api/products/${productId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const rateProduct = async ({ productId, userId, rating }) => {
  try {
    const response = await fetch(
      "https://raiment-gallery-ecommerce.vercel.app/api/rateProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId, rating }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error rating product:", error);
    throw error; // You can handle errors in your components
  }
};

// export const createProductReview = async (req, res, next) => {
//   const { rating, comment, productId } = req.body;

//   const review = {
//     user: req?.user?._id,
//     rating: Number(rating),
//     comment,
//   };

//   let product = await Product.findById(productId);

//   if (!product) {
//     return next(new ErrorHandler("Product not found.", 404));
//   }

//   const isReviewed = product?.reviews?.find(
//     (r) => r.user.toString() === req.user._id.toString()
//   );

//   if (isReviewed) {
//     product?.reviews.forEach((review) => {
//       if (review.user.toString() === req.user._id.toString()) {
//         review.comment = comment;
//         review.rating = rating;
//       }
//     });
//   } else {
//     product?.reviews.push(review);
//   }

//   product.ratings =
//     product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
//     product.reviews.length;

//   await product?.save();

//   res.status(200).json({
//     success: true,
//   });
// };
