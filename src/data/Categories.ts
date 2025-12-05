// =========================
// CATEGORY TYPES
// =========================

export type CategoryItem = {
  title: string;
  image: { uri: string };
  slug: string;
};

export type ProductItem = {
  id: string;
  name: string;
  price: string;
  image: { uri: string };
};

export type HotDealItem = {
  id: number;
  name: string;
  price: string;
  image: { uri: string };
};

// =========================
// KITCHEN & COOKING
// =========================

export const kitchenCategories = {
  title: "Kitchen & Cooking",
  slug: "kitchen-cooking",
  
  bigCards: <CategoryItem[]>[
    {
      title: "Oils",
      slug: "oils",
      image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-2.png" },
    },
    {
      title: "Spices & Flavours",
      slug: "spices-flavours",
      image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-6.png" },
    },
  ],

  smallCards: <CategoryItem[]>[
    { title: "Rice & More", slug: "rice", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-8.png" } },
    { title: "Atta & Flours", slug: "atta", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-5.png" } },
    { title: "Dals & Pulses", slug: "dals", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-4.png" } },
    { title: "Masalas", slug: "masalas", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-7.png" } },
  ],
};

// =========================
// SNACKS & DRINKS
// =========================

export const snacksCategories = {
  title: "Snacks & Drinks",
  slug: "snacks-drinks",

  bigCard: {
    title: "Dry Fruits",
    slug: "dryfruits",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/28.png" },
  },

  row1Small: <CategoryItem[]>[
    { title: "Tea & Coffee Corner", slug: "tea-coffee", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/29.png" } },
    { title: "Ice Cream & Desserts", slug: "desserts", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/30.png" } },
    { title: "Sweet Treats", slug: "sweets", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/31.png" } },
    { title: "Munchies", slug: "munchies", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/32.png" } },
  ],

  row2Small: <CategoryItem[]>[
    { title: "Seasonal", slug: "seasonal", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/33.png" } },
    { title: "Cold Drinks", slug: "drinks", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/35.png" } },
    { title: "Instant Mix", slug: "instant", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/34.png" } },
    { title: "Others", slug: "others", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/02/36.png" } },
  ],
};

// =========================
// HOME CARE (CATEGORY ONLY)
// =========================

export const homeCare = {
  title: "Home & Care",
  slug: "home-care",

  smallCards: <CategoryItem[]>[
    { title: "Laundry Care", slug: "laundry", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-11.png" } },
    { title: "Laundry Fragrance", slug: "fragrance", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-16.png" } },
    { title: "Dishwash", slug: "dishwash", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-11-1.png" } },
    { title: "Kitchen Cleaners", slug: "kitchen-cleaners", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-12-1.png" } },
    { title: "Surface Cleaners", slug: "surface", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-15.png" } },
    { title: "Bathroom Cleaners", slug: "bathroom", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-13-1.png" } },
    { title: "Air Fresheners", slug: "air-fresheners", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-14.png" } },
    { title: "Shoe Care", slug: "shoe-care", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-18.png" } },
  ],
};

// =========================
// PERSONAL CARE
// =========================

export const personalCare = {
  title: "Personal Care",
  slug: "personal-care",

  smallCards: <CategoryItem[]>[
    { title: "Bath & Body", slug: "bath-body", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-28.png" } },
    { title: "Hair Care", slug: "hair-care", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-29.png" } },
    { title: "Skin Care", slug: "skin-care", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-21.png" } },
    { title: "Oral Care", slug: "oral-care", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-22.png" } },
    { title: "Feminine", slug: "feminine", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-23.png" } },
    { title: "Makeup", slug: "makeup", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-24.png" } },
    { title: "Wellness", slug: "wellness", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-26.png" } },
    { title: "Jewellery", slug: "jewellery", image: { uri: "https://infinigoal.in/wp-content/uploads/2025/01/Menus-25.png" } },
  ],
};

// =========================
// infinigoal Signature (CategoryItem)
// =========================

export const Cards = <CategoryItem[]>[
  {
    title: "Wood Presses Oil",
    slug: "wood-presses-oil",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Wood-Pressed-Oils-600x889.png" },
  },
  {
    title: "Premium Dry Fruits",
    slug: "premium-dry-fruits",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Premium-Dry-Fruits-600x889.png" },
  },
  {
    title: "Kerala Spices",
    slug: "kerala-spices",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Kerala-Spices-600x889.png" },
  },
  {
    title: "Premium Dry Seeds",
    slug: "premium-dry-seeds",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Premium-Dry-Seeds-2-600x889.png" },
  },
  {
    title: "Country Chili",
    slug: "country-chili",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Country-Dry-Chilli-1-600x889.png" },
  },
  {
    title: "Organic Ghee",
    slug: "organic-ghee",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Organic-Ghee-600x889.png" },
  },
  {
    title: "Organic Brown Sugar",
    slug: "organic-brown-sugar",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Organic-Brown-Sugar-600x889.png" },
  },
  {
    title: "Organic Rice",
    slug: "organic-rice",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Organic-Thuyamalli-Rice-1-600x889.png" },
  },
  {
    title: "Organic Rock Salt",
    slug: "organic-rock-salt",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/08/Organic-Rock-Salt-600x889.png" },
  },
];






// =========================
// HotDeals Product
// =========================

export const HotDealsproducts = <HotDealItem[]>[
  {
    id: 1,
    name: "Aachi Masala Combo – 1",
    image: {
      uri: "https://infinigoal.in/wp-content/uploads/2025/01/Aachi-Combo-V1-2-e1736659515451-600x753.jpg",
    },
    price: "₹275",
  },
  {
    id: 2,
    name: "Aachi Masala Combo – 3",
    image: {
      uri: "https://infinigoal.in/wp-content/uploads/2025/01/Aachi-Combo-V1-1-e1736659763999.jpg",
    },
    price: "₹179",
  },
  {
    id: 3,
    name: "Aachi Masala Combo – 2 ",
    image: {
      uri: "https://infinigoal.in/wp-content/uploads/2025/01/Aachi-Combo-V1-e1736659618504.jpg",
    },
    price: "₹155",
  },
  {
    id: 4,
    name: "Budget-Friendly HomeCare Combo – All in One",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/04/6.png" },
    price: "₹419",
  },
  {
    id: 5,
    name: "Top Branded HomeCare Essentials Combo – All in One",
    image: { uri: "https://infinigoal.in/wp-content/uploads/2025/04/5.png" },
    price: "₹699",
  },
];



