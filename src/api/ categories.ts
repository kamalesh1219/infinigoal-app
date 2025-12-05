import { supabase } from "../lib/supabase";
import { CategoryItem } from "../data/Categories"; // your type file

export async function fetchKitchenCategories() {
  const { data, error } = await supabase
    .from("category_items")
    .select("title, slug, image_url, kind, sort_index")
    .eq("group_slug", "kitchen-cooking")
    .order("sort_index", { ascending: true });

  if (error) {
    console.log("fetchKitchenCategories error", error.message);
    return { bigCards: [], smallCards: [] };
  }

  const bigCards: CategoryItem[] = [];
  const smallCards: CategoryItem[] = [];

  data?.forEach((row) => {
    const item: CategoryItem = {
      title: row.title,
      slug: row.slug,
      image: { uri: row.image_url },
    };

    if (row.kind === "big") bigCards.push(item);
    if (row.kind === "small") smallCards.push(item);
  });

  return { bigCards, smallCards };
}
