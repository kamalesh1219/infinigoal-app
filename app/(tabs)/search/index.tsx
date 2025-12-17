import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Search, Package, Grid2X2 } from "lucide-react-native";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// ======================================
// TypeScript Types
// ======================================
type ProductType = {
  id: string;
  name: string;
  price: string;
  image: string;     // stored as plain string in Supabase
};

type CategoryType = {
  id: string;
  title: string;
  slug: string;
  image: string;     // stored as plain string in Supabase
};

// ======================================
// Search Page Component
// ======================================
export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔍 Fetch from Supabase
  const searchData = async () => {
    if (!query.trim()) return;

    setLoading(true);

    // ---------- 1. SEARCH PRODUCTS ----------
    const { data: productData } = await supabase
      .from("products")
      .select("id, name, price, image")
      .ilike("name", `%${query}%`);

    // ---------- 2. SEARCH CATEGORIES ----------
    const { data: categoryData } = await supabase
      .from("category_items")
      .select("id, title, slug, image")
      .ilike("title", `%${query}%`);

    setProducts(productData || []);
    setCategories(categoryData || []);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      {/* HEADER */}
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900">Search</Text>
      </View>

      {/* SEARCH BAR */}
      <View className="flex-row items-center mx-4 bg-gray-100 rounded-full px-4 py-3">
        <Search size={22} color="#6b7280" />
        <TextInput
          placeholder="Search products or categories..."
          className="flex-1 ml-3 text-lg"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchData}
        />
      </View>

      {loading && (
        <Text className="text-center mt-6 text-gray-500 text-lg">
          Searching...
        </Text>
      )}

      <ScrollView className="mt-4 px-4">

        {/* =======================
            CATEGORY RESULTS 
        ======================== */}
        {categories.length > 0 && (
          <>
            <Text className="text-xl font-semibold mt-4 mb-2">Categories</Text>

            <View className="flex-row flex-wrap justify-between">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => router.push(`/categories/${cat.slug}`)}
                  className="bg-gray-100 w-[48%] rounded-xl p-4 mb-3 flex-row items-center"
                >
                  <Grid2X2 size={24} color="#2563EB" />
                  <Text className="ml-3 text-lg font-medium text-gray-900">
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* =======================
            PRODUCT RESULTS
        ======================== */}
        {products.length > 0 && (
          <>
            <Text className="text-xl font-semibold mt-6 mb-2">Products</Text>

            {products.map((prod) => (
              <TouchableOpacity
                key={prod.id}
                onPress={() => router.push(`/productdetails/${prod.id}`)}
                className="flex-row bg-gray-100 rounded-xl p-3 mb-3"
              >
                <Image
                  source={{ uri: prod.image }}
                  className="w-20 h-20 rounded-lg"
                />

                <View className="ml-3 flex-1">
                  <Text className="text-lg font-semibold" numberOfLines={1}>
                    {prod.name}
                  </Text>
                  <Text className="text-red-600 font-bold mt-1">
                    ₹{prod.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* =======================
            NO RESULTS UI
        ======================== */}
        {!loading &&
          query.length > 0 &&
          products.length === 0 &&
          categories.length === 0 && (
            <View className="items-center mt-20">
              <Package size={70} color="#9ca3af" />
              <Text className="text-gray-400 text-lg mt-4">
                No results found
              </Text>
            </View>
          )}

      </ScrollView>
    </SafeAreaView>
  );
}
