import React from "react";
import { View, Text, Image, TouchableOpacity,Dimensions } from "react-native";
import { kitchenCategories } from "@/src/data/Categories";
import { openCategory } from "@/src/utils/navigation";

export default function KitchenCategories() {
  const { title, bigCards, smallCards  } = kitchenCategories;
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="px-4 mt-10">
      {/* Heading */}
      <Text className="text-2xl italic font-bold text-gray-800 mb-7 text-center ">
        Kitchen & Cooking
      </Text>

      {/* Big Cards Row */}
      <View className="flex-row justify-around ">
        {bigCards.map((item, idx) => (
          <TouchableOpacity
            onPress={() => openCategory(item.slug)}
            key={idx}
            className="bg-[#FEFFEC] w-[48%] rounded-2xl p-4 shadow-lg shadow-black items-center"
          >
            <Image
              source={item.image}
              className="w-full h-56 mb-2"
              resizeMode="contain"
            />          
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTTOM — SMALL CARDS (1×4 row) */}
      <View className="flex-row justify-around mt-2 ">
        {smallCards.map((item, i) => (
          <TouchableOpacity
            onPress={() => openCategory(item.slug)}
            key={i}
            className="w-[23%] bg-[#FEFFEC] rounded-2xl p-3 shadow-md shadow-black/70 items-center"
          >
            <Image
              source={item.image}
                style={{
                    width: "100%",
                    height: screenWidth * 0.30,  // 25% of screen width
                  }}
              resizeMode="contain"
            />
            
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
}