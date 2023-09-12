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
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
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
      {
        id: "admin",
        label: "Admin",
      },
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
  }
];


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
];

// export const TagsAll= [
//   {
//     id: "alltags",
//     type: "",
//     placeholder: "",
//     label: "All Tags",
//     componentType: "select", //multiple
//     options: [
//       {
//         id: "mart",
//         label: "Mart",
//       },
//       {
//         id: "rice",
//         label: "Rice",
//       },
//       {
//         id: "bras",
//         label: "Bras",
//       },
//     ],
//   },
// ]
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
