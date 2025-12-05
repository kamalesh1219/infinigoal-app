import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Dimensions, View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import React, { useEffect, useRef, useState } from "react";
import { openProduct } from "@/src/utils/navigation";
import { supabase } from "@/src/lib/supabase";

const width = Dimensions.get("window").width;

type HotDeal = {
  id: string;
  name: string;
  price_text: string;
  image_url: string;
};

export default function SliderProduct() {
  const progress = useSharedValue(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const [items, setItems] = useState<HotDeal[]>([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // LOAD HOT DEALS FROM SUPABASE
  // ================================
  async function loadHotDeals() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("tag", "hot-deals");

    if (error) {
      console.log("Supabase HotDeals Error:", error);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadHotDeals();
  }, []);

  // ================================
  // LOADING UI
  // ================================
  if (loading) {
    return (
      <View className="mt-10 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2 text-gray-600">Loading Hot Deals...</Text>
      </View>
    );
  }

  // No products found
  if (items.length === 0) {
    return (
      <View className="mt-10 items-center">
        <Text className="text-gray-600 text-lg">No Hot Deals Available</Text>
      </View>
    );
  }

  // ================================
  // MAIN UI
  // ================================
  return (
    <View className="bg-red-200 rounded-xl mx-3 mt-10 items-center pb-6 relative">

      <Text className="font-bold text-2xl text-center mb-5 mt-3">
        Hot Deals
      </Text>

      {/* LEFT ARROW */}
      <TouchableOpacity
        className="absolute left-0 top-[45%] z-10 bg-white rounded-full w-10 h-10 items-center justify-center border border-black"
        onPress={() => carouselRef.current?.prev()}
      >
        <Text className="text-2xl font-bold">{"<"}</Text>
      </TouchableOpacity>

      {/* RIGHT ARROW */}
      <TouchableOpacity
        className="absolute right-0 top-[45%] z-10 bg-white rounded-full w-10 h-10 items-center justify-center border border-black"
        onPress={() => carouselRef.current?.next()}
      >
        <Text className="text-2xl font-bold">{">"}</Text>
      </TouchableOpacity>

      {/* CAROUSEL */}
      <Carousel
        ref={carouselRef}
        data={items}
        width={width * 0.9}
        height={260}
        autoPlay
        autoPlayInterval={3000}
        loop
        pagingEnabled
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openProduct(item.id)}
            className="bg-white rounded-2xl p-4 items-center pb-8"
          >
            {/* TITLE */}
            <Text className="text-sm font-bold mb-3 text-center">
              {item.name}
            </Text>

            {/* IMAGE + DETAILS */}
            <View className="flex-row justify-between w-full">

              {/* IMAGE */}
              <View className="w-[48%]">
                <Image
                  source={{ uri: item.image_url }}
                  className="w-full h-52"
                  resizeMode="contain"
                />
              </View>

              {/* DETAILS */}
              <View className="w-[48%]">
                <Text className="font-bold text-xl text-center">MRP</Text>

                <Text className="text-red-500 font-bold text-lg text-center">
                  {item.price_text}
                </Text>

                <View className="bg-yellow-300 items-center rounded-2xl mt-1 mx-4 shadow-md shadow-black">
                  <Text className="font-bold text-xl">Our Price</Text>
                  <Text className="text-red-500 font-bold text-xl">
                    {item.price_text}
                  </Text>
                </View>

                <TouchableOpacity className="bg-blue-700 px-4 py-2 rounded-full mt-5 w-full">
                  <Text className="text-white text-center">Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* DOT PAGINATION */}
      <Pagination.Basic
        progress={progress}
        data={items}
        dotStyle={{
          backgroundColor: "rgba(0,0,0,0.2)",
          width: 8,
          height: 8,
          borderRadius: 50,
        }}
        activeDotStyle={{
          backgroundColor: "black",
          width: 10,
          height: 10,
          borderRadius: 50,
        }}
        containerStyle={{
          gap: 6,
          alignSelf: "center",
          marginBottom: 8,
        }}
      />
    </View>
  );
}
