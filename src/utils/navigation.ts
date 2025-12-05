import { router } from "expo-router";
import { allProducts } from "@/src/data/allProducts";

export const openProduct = (id: string) => {
  router.push({   
    pathname: "/productdetails/[id]", // 👈 must match folder name
    params: { id },
  });
};

export const openCategory = (slug: string) => {
  console.log("Opening category with slug:", slug);
  router.push({
    pathname: "/categorie/[slug]",
    params: { slug },
  });
};

