export const navOptions = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingMen",
    label: "Men",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Women",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: "kids",
    path: "/product/listing/kids",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage Products",
    path: "/admin-view/all-items",
  },
  {
    id: "adminNewProduct",
    label: "Add Product",
    path: "/admin-view/add-items",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      // {
      //   id: "admin",
      //   label: "Admin",
      // },
      {
        id: "customer",
        label: "customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "itemCode",
    type: "text",
    placeholder: "Enter Unique Item Code",
    label: "Item Code",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
      {
        id: "all",
        label: "All",
      },
      {
        id: "premium",
        label: "Premium",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
  {
    id: "quantity",
    type: "",
    placeholder: "",
    label: "Quantity",
    componentType: "select",
    options: [
      {
        id: "1",
        label: "1",
      },
    ],
  },
];

export const ProductSpecificationsForm = [
  {
    id: "details",
    type: "text",
    placeholder: "Enter product details",
    label: "Product Details List",
    componentType: "input",
  },
  {
    id: "material",
    type: "text",
    placeholder: "Enter product material's",
    label: "Material",
    componentType: "input",
  },
  {
    id: "brand",
    type: "text",
    placeholder: "Enter brand name",
    label: "Brand",
    componentType: "input",
  },
  {
    id: "whatsInTheBox",
    type: "text",
    placeholder: "What's In The Box?",
    label: "Whats In The Box",
    componentType: "input",
  },
]

// export const reviewsForm = [
//   {
//     id: "revUser",
//     type: "text",
//     placeholder: "User",
//     label: "revUser",
//     componentType: "input",
//   },
//   {
//     id: "textReview",
//     type: "text",
//     placeholder: "Give a review",
//     label: "Review",
//     componentType: "input",
//   },
//   {
//     id: "starRating",
//     type: "number",
//     placeholder: "5",
//     label: "Star Review",
//     componentType: "input",
//   },
// ]

export const AvailableSizes = [
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
  {
    id: "xl",
    label: "XL",
  },
  {
    id: "2xl",
    label: "2XL",
  },
  {
    id: "3xl",
    label: "3XL",
  },
];

// colors

export const ColorsWhite = [
  {
    id: "white",
    label: "White",
  },
];
export const ColorsBlue = [
  {
    id: "blue",
    label: "Blue",
  },
];
export const ColorsYellow = [
  {
    id: "yellow",
    label: "Yellow",
  },
];
export const ColorsBlack = [
  {
    id: "black",
    label: "Black",
  },
];
export const ColorsRed = [
  {
    id: "red",
    label: "Red",
  },
];
export const ColorsPink = [
  {
    id: "pink",
    label: "Pink",
  },
];

// End colors

export const CategoryTags = [
  {
    id: "mart",
    label: "Mart",
  },
  {
    id: "beautyGlamour",
    label: "Beauty & Glamour",
  },
  {
    id: "homeMakeover",
    label: "Home Makeover",
  },
  {
    id: "fashion",
    label: "Fashion",
  },
  {
    id: "budgetDeals",
    label: "Budget deals",
  },
  {
    id: "bestPriceGuaranteed",
    label: "Best Price Guaranteed",
  },
  {
    id: "freeDelivery",
    label: "Free Delivery",
  },
  {
    id: "everydayLowPrice",
    label: "Everyday Low Price",
  },
  {
    id: "jersey",
    label: "Jersey",
  },
  {
    id: "hotChocoleteandNutritionDrinks",
    label: "Hot Chocolete and Nutrition Drinks",
  },
  {
    id: "screenProtectors",
    label: "Screen Protectors",
  },
  {
    id: "handWashesandSanitizers",
    label: "Hand Washes and Sanitizers",
  },
  {
    id: "rice",
    label: "Rice",
  },
  {
    id: "tShirts",
    label: "T-Shirts",
  },
  {
    id: "phoneCases",
    label: "Phone Cases",
  },
  {
    id: "clothsTowels",
    label: "Cloths & Towels",
  },
  {
    id: "bodySoapsShowerGels",
    label: "Body Soaps & Shower Gels",
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
  },
  {
    id: "fashionWallets",
    label: "Fashion Wallets",
  },
  {
    id: "bras",
    label: "Bras",
  },
  {
    id: "doorHardwareLocks",
    label: "Door Hardware & Locks",
  },
  {
    id: "wirelessEarbuds",
    label: "Wireless Earbuds",
  },
  {
    id: "balloons",
    label: "Balloons",
  },
  {
    id: "laptopStands",
    label: "Laptop Stands",
  },
  {
    id: "premium",
    label: "Premium Item",
  },
];

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STROAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};


export const firebaseStroageURL = 'gs://next-js-ecommerce-2023-5d8d1.appspot.com';

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
  {
    id: "mobile",
    type: "tel",
    placeholder: "01XXX-XXXXXX",
    label: "Mobile",
    componentType: "input",
  },
];
