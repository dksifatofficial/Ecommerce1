import Cookies from "js-cookie";

export const addToWishlist = async (formData) => {
  try {
    const res = await fetch("/api/wishlist/add-to-wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllWishlistItems = async (id) => {
  try {
    const res = await fetch(
      `https://raiment-gallery-ecommerce.vercel.app/api/wishlist/all-wishlist-items?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFromWishlist = async (id) => {
  try {
    const res = await fetch(`/api/wishlist/delete-from-wishlist?id=${id}`, {
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
