// allProducts.ts
import {
  homeCare,
  personalCare,
  Cards,
 


  snacksCategories,
  HotDealsproducts,
  kitchenCategories,
} from "./Categories";

// Converts ANY product/category shape into clean standard format
function normalize(list: any[], prefix: string, category: string) {
  return list.map((item, index) => {
    const baseId = item.id ?? index + 1; // use item.id if exists, else index

    return {
      id: `${prefix}-${baseId}`,         // 👈 FINAL UNIQUE ID
      name: item.name ?? item.title,     // some have title only
      title: item.title ?? item.name,
      price: item.price || "0",
      mrp: item.mrp || undefined,
      image: item.image?.uri || item.image || "",
      description: item.description || "",
      category,
      slug: item.slug || undefined,
    };
  });
}

export const allProducts = [
  // Category-type cards (optional for details)
  ...normalize(homeCare.smallCards, "homeCare", "homecare"),
  ...normalize(personalCare.smallCards, "personalCare", "personalcare"),
  ...normalize(Cards, "cards", "signature"),

  // REAL PRODUCTS – these we will open in ProductDetails
  


  ...normalize(HotDealsproducts, "slider", "hotdeals"),

  // Kitchen category cards (if needed)
  ...normalize(kitchenCategories.bigCards, "kitchenbig", "kitchen"),
  ...normalize(kitchenCategories.smallCards, "kitchensmall", "kitchen"),
];

// (optional helper)
export const findProductById = (id: string) =>
  allProducts.find((p) => p.id === id);
