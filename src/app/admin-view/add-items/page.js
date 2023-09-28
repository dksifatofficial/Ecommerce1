"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import {
  AvailableSizes,
  CategoryTags,
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
    <div className="w-full px-[100px] py-[50px] mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
            multiple
          />
          <div className="flex flex-wrap gap-2">
            {formData.imageUrl.map((imageUrl, index) => (
              <div key={index} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={`Product Image ${index}`}
                  className="max-w-[200px] max-h-[200px] object-contain"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>

          <div>
            {/* <InputComponent
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
            ) : null
          )}

          <InputComponent
            type="number"
            placeholder="5"
            label="Star"
            value={formData.starRatings.starRating}
            controlItem="starRating"
            onChange={handleInputChange}
          />

          {/* Category Tags */}
          <div className="flex gap-2 flex-col">
            <label>Select Your Category Tags</label>
            <TileComponent
              selected={formData.tags}
              onClick={handleCategoryTags}
              data={CategoryTags}
            />
          </div>

          <button
            onClick={handleAddProduct}
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          >
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
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
}
