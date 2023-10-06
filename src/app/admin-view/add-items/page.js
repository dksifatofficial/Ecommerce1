"use client";

import AdminViewMenu from "@/components/AdminMenu/AdminViewMenu";
import Button3 from "@/components/Buttons/Button3";
import ColorTileComponent from "@/components/FormElements/ColorTileComponent";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TextareaComponent from "@/components/FormElements/TextareaComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import {
  AvailableSizes,
  CategoryTags,
  ColorsBlack,
  ColorsBlue,
  ColorsPink,
  ColorsRed,
  ColorsWhite,
  ColorsYellow,
  ProductSpecificationsForm,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: [],
  priceDrop: 0,
  tags: [],
  quantity: 1,
  itemCode: "",
  starRatings: [],
  colors: [],
  details: "",
  material: "",
  brand: "",
  whatsInTheBox: "",
};

export default function AdminAddNewProduct() {
  const [formData, setFormData] = useState(initialFormData);

  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    user,
  } = useContext(GlobalContext);

  const [currentRevUser, setCurrentRevUser] = useState(user?._id);

  useEffect(() => {
    setCurrentRevUser(user?._id);
  }, [user?._id]);

  const handleInputChange = (event) => {
    const newRevUser = user?._id;
    const updatedStarRatings = [...formData.starRatings];

    // Check if the current revUser value is different
    const existingIndex = updatedStarRatings.findIndex(
      (item) => item.revUser === currentRevUser
    );

    const newStarRating = parseFloat(event.target.value); // Convert the input value to a number

    if (!isNaN(newStarRating)) {
      // Check if the conversion was successful
      if (existingIndex !== -1) {
        // If the revUser value is the same, edit the previous entry
        updatedStarRatings[existingIndex].starRating = newStarRating;
      } else {
        // If the revUser value is different, add a new entry
        updatedStarRatings.push({
          starRating: newStarRating,
          revUser: newRevUser,
        });
      }

      setFormData({
        ...formData,
        starRatings: updatedStarRatings,
      });

      // Update the currentRevUser state with the new value
      setCurrentRevUser(newRevUser);
    } else {
      // Handle the case where the input value is not a valid number
      // You can show an error message or take other appropriate action here
    }
  };

  console.log(currentUpdatedProduct, "currentUpdatedProduct");

  const router = useRouter();

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  // Image section
  async function handleImage(event) {
    const newImages = [...formData.imageUrl];

    for (const file of event.target.files) {
      const extractImageUrl = await helperForUPloadingImageToFirebase(file);

      if (extractImageUrl !== "") {
        newImages.push(extractImageUrl);
      }
    }

    setFormData({
      ...formData,
      imageUrl: newImages,
    });
  }

  function handleRemoveImage(index) {
    const newImages = [...formData.imageUrl];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      imageUrl: newImages,
    });
  }

  // async function handleImage(event) {
  //   const extractImageUrl = await helperForUPloadingImageToFirebase(
  //     event.target.files[0]
  //   );

  //   if (extractImageUrl !== "") {
  //     setFormData({
  //       ...formData,
  //       imageUrl: extractImageUrl,
  //     });
  //   }
  // }

  // for sizes
  function handleTileClick(getCurrentItem) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  // for colors
  function handleColorsTileClick(getCurrentItem) {
    let cpyColors = [...formData.colors];
    const index = cpyColors.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpyColors.push(getCurrentItem);
    } else {
      cpyColors = cpyColors.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      colors: cpyColors,
    });
  }

  // Category Tags
  function handleCategoryTags(getCurrentItem) {
    let cTags = [...formData.tags];
    const index = cTags.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cTags.push(getCurrentItem);
    } else {
      cTags = cTags.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      tags: cTags,
    });
  }

  async function handleAddProduct() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-items");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }

  console.log(formData);

  return (
    <div className="w-full px-0 md:px-6 lg:px-12 py-1 md:py-3 lg:py-8 m-0 relative">
      <AdminViewMenu />
      <div
        className="mt-4 flex flex-col items-start justify-start p-4 md:p-6 lg:p-10 bg-white shadow-2xl relative
        bg-[linear-gradient(to_bottom_right,#0d9488,#95a7a5,#f85606)]"
      >
        <div className="w-full space-y-4 lg:space-y-8">
          {/* Product Images */}
          <div className="space-y-4 border p-4 lg:p-6 rounded-md bg-white">
            <div className="flex flex-col">
              <label className="pb-2 text-sm lg:text-lg font-semibold">
                Product Images <span className="text-red-600">*</span>
              </label>
              <input
                className="text-xs lg:text-sm"
                accept="image/*"
                max="1000000"
                type="file"
                onChange={handleImage}
                multiple
              />
              <p className="pt-2 text-xs text-gray-500">
                Upload between 3 to 5 images
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {formData.imageUrl.map((imageUrl, index) => (
                <div key={index} className="relative w-[140px] h-[180px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={`Product Image ${index}`}
                    className="w-[140px] h-[180px] object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute text-xs top-1 right-1 bg-red-500 text-white py-0 px-1 rounded-full cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Available Sizes */}
          <div className="border p-4 lg:p-6 rounded-xl bg-white">
            <label className="pb-2 text-lg font-semibold">
              Available Sizes <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 flex-col">
              <p className="pt-2 text-xs text-gray-500">Select sizes</p>
              <TileComponent
                selected={formData.sizes}
                onClick={handleTileClick}
                data={AvailableSizes}
              />
            </div>
          </div>

          {/* Available Colors */}
          <div className="border p-4 lg:p-6 rounded-xl bg-white">
            <label className="pb-2 text-lg font-semibold">
              Available Colors <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 flex-col">
              <p className="pt-2 text-xs text-gray-500">Available Colors</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <ColorTileComponent
                  className="bg-pink-500 text-white"
                  selected={formData.colors}
                  onClick={handleColorsTileClick}
                  data={ColorsPink}
                />
                <ColorTileComponent
                  className="bg-red-600 text-white"
                  selected={formData.colors}
                  onClick={handleColorsTileClick}
                  data={ColorsRed}
                />
                <ColorTileComponent
                  className="bg-black text-white"
                  selected={formData.colors}
                  onClick={handleColorsTileClick}
                  data={ColorsBlack}
                />
                <ColorTileComponent
                  className="bg-white"
                  selected={formData.colors}
                  onClick={handleColorsTileClick}
                  data={ColorsWhite}
                />
                <ColorTileComponent
                  className="bg-blue-500 text-white"
                  selected={formData.colors}
                  onClick={handleColorsTileClick}
                  data={ColorsBlue}
                />
                <ColorTileComponent
                  className="bg-yellow-500"
                  selected={formData.colors}
                  onClick={handleColorsTileClick}
                  data={ColorsYellow}
                />
              </div>
            </div>
          </div>

          {/* text review */}
          <div>
            {/* <TextareaComponent
              type="text"
              placeholder="It's a Awesome Product"
              label="Write a Review"
              value={formData.starRatings.textReview}
              controlItem="textReview"
              onChange={(event) => {
                const updatedStarRatings = [...formData.starRatings];
                updatedStarRatings[0] = {
                  ...updatedStarRatings[0],
                  textReview: event.target.value,
                };

                setFormData({
                  ...formData,
                  starRatings: updatedStarRatings,
                });
              }}
            /> */}
          </div>

          {/* Product Information */}
          <div className="space-y-4 border p-4 lg:p-6 rounded-xl bg-white">
            <p className="pb-2 text-lg font-semibold">
              Product Information <span className="text-red-600">*</span>
            </p>
            {adminAddProductformControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                // eslint-disable-next-line react/jsx-key
                <InputComponent
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  label={controlItem.label}
                  options={controlItem.options}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : controlItem.componentType === "textarea" ? (
                <TextareaComponent
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : null
            )}
          </div>

          {/* ProductSpecificationsForm */}
          <div className="space-y-4 border p-4 lg:p-6 rounded-xl bg-white">
            <p className="pb-2 text-lg font-semibold">
              Specifications of Product <span className="text-red-600">*</span>
            </p>
            {ProductSpecificationsForm.map((controlItem) =>
            controlItem.componentType === "input" ? (
                // eslint-disable-next-line react/jsx-key
                <InputComponent
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                /> ) : controlItem.componentType === "textarea" ? (
                  <TextareaComponent
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={formData[controlItem.id]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                ) : null
            )}
          </div>

          {/* Review */}
          <div className="border p-4 lg:p-6 rounded-xl bg-white">
            <label className="pb-2 text-lg font-semibold">Review</label>
            <div className="flex gap-2 flex-col">
              <p className="py-2 text-xs text-gray-500">
                Give a number between 1 & 5
              </p>
              <InputComponent
                type="number"
                placeholder="5"
                label="Star"
                value={formData.starRatings.starRating}
                controlItem="starRating"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Category Tags */}
          <div className="border p-4 lg:p-6 rounded-xl bg-white">
            <label className="pb-2 text-lg font-semibold">
              Category Tags <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 flex-col">
              <p className="pt-2 text-xs text-gray-500">
                Select Your Category Tags
              </p>
              <TileComponent
                selected={formData.tags}
                onClick={handleCategoryTags}
                data={CategoryTags}
              />
            </div>
          </div>

          {/* Button */}
          <div className="border p-4 lg:p-6 rounded-xl flex justify-center bg-white">
            <Button3 className="w-[250px]" onClick={handleAddProduct}>
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text={
                    currentUpdatedProduct !== null
                      ? "Updating Product"
                      : "Adding Product"
                  }
                  color={"#ffffff"}
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : currentUpdatedProduct !== null ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button3>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
