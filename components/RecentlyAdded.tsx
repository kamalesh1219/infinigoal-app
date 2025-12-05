import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@/src/lib/supabase"; // make sure supabase client exists
import { openProduct } from "@/src/utils/navigation";

type Product = {
  id: string;
  name: string;
  price_text: string;
  image_url: string;
};

export default function RecentlyAdded() {
  const screenWidth = Dimensions.get("window").width;
  const SLIDE_WIDTH = screenWidth * 0.9; 
  const CARD_WIDTH = SLIDE_WIDTH * 0.45;

  const flatListRef = useRef<FlatList>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD FROM SUPABASE
  // ==========================================
  async function loadRecentItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("tag", "recently-added");

    if (error) {
      console.log("Supabase Recently Added error:", error);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadRecentItems();
  }, []);

  // ==========================================
  // CREATE SLIDES (2 per slide)
  // ==========================================
  const slides = [];
  for (let i = 0; i < items.length; i += 2) {
    slides.push(items.slice(i, i + 2));
  }

  const goNext = () => {
    if (!flatListRef.current) return;
    if (currentSlide < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentSlide + 1, animated: true });
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goPrev = () => {
    if (!flatListRef.current) return;
    if (currentSlide > 0) {
      flatListRef.current.scrollToIndex({ index: currentSlide - 1, animated: true });
      setCurrentSlide(currentSlide - 1);
    }
  };

  // ==========================================
  // LOADER
  // ==========================================
  if (loading) {
    return (
      <View className="mt-14 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-3 text-gray-600">Loading...</Text>
      </View>
    );
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <View className="mt-14 px-3">
      <View className="bg-[#C9D9FF] rounded-3xl p-4 relative">
        <Text className="text-center text-2xl font-semibold text-gray-800 mb-5">
          Recently Added
        </Text>

        {/* Left Arrow */}
        <TouchableOpacity
          onPress={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/6 bg-white w-10 h-10 rounded-full
                     items-center justify-center border border-gray-500 z-10"
        >
          <Text className="text-xl">‹</Text>
        </TouchableOpacity>

        {/* Right Arrow */}
        <TouchableOpacity
          onPress={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/6 bg-white w-10 h-10 rounded-full
                     items-center justify-center border border-gray-500 z-10"
        >
          <Text className="text-xl">›</Text>
        </TouchableOpacity>

        {/* Slider */}
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: SLIDE_WIDTH }} className="flex-row justify-around px-2">

              {item.map((prod : any) => (
                <TouchableOpacity
                  key={prod.id}
                  onPress={() => openProduct(prod.id)}
                  style={{ width: CARD_WIDTH }}
                  className="bg-white rounded-2xl p-4 mx-1 mb-4 flex-1 justify-between items-center"
                >
                  <Image
                    source={{ uri: prod.image_url }}
                    className="w-32 h-32"
                    resizeMode="contain"
                  />

                  <Text className="text-center text-base font-semibold mt-2">
                    {prod.name}
                  </Text>

                  <Text className="text-center text-red-600 font-semibold mt-1">
                    {prod.price_text}
                  </Text>

                  <TouchableOpacity
                    onPress={() => openProduct(prod.id)}
                    className="bg-yellow-300 px-4 py-3 rounded-full mt-3 mb-5 w-full"
                  >
                    <Text className="font-bold text-center">Add to Cart</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

              {item.length === 1 && <View style={{ width: CARD_WIDTH }} />}
            </View>
          )}
        />
      </View>
    </View>
  );
}
