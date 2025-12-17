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
  MRP:string;
};

export type HotDealItem = {
  id: number;
  name: string;
  price: string;
  image: { uri: string };
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



