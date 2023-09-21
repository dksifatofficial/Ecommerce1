import Cookies from "js-cookie";

export const createNewRating = async (formData) => {
  try {
    const res = await fetch("/api/rating/create-star-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const getAllRatingForUser = async (id) => {
  try {
    const res = await fetch(`/api/rating/get-all-rating?id=${id}`, {
      method: "GET",
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
