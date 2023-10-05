export const login = async (formData) => {
  try {
    const response = await fetch("https://ecommerce.aminulkibria.com/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
