import { supabase } from "@/src/lib/supabase";

export async function fetchCategoriesByGroup(group_slug: string) {
  const { data, error } = await supabase
    .from("category_items")
    .select("*")
    .eq("group_slug", group_slug)
    .order("created_at", { ascending: true });

  if (error) {
    console.log("Category fetch error:", error);
    return [];
  }

  return data;
}
