import React from "react";
import { View, Text, Image, TouchableOpacity,Dimensions } from "react-native";
import { snacksCategories } from "@/src/data/Categories";
import { openCategory } from "@/src/utils/navigation";

export default function SnacksCategories() {
  const { title, bigCard,row1Small,row2Small} = snacksCategories;
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="px-4 mt-10">

      {/* Heading */}
      <Text className="text-xl italic font-semibold text-center mb-10">
        Snacks & Drinks
      </Text>

      {/* ROW 1 — Big Card + 4 Small Cards */}
      <View className="flex-row justify-between">

        {/* BIG CARD */}
        <TouchableOpacity 
         onPress={() => openCategory(bigCard.slug)}
         className="bg-[#FEFFEC] w-[48%] rounded-2xl p-4 shadow-lg shadow-black items-center">
          <Image
            source={bigCard.image}
            className="w-full h-72"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* RIGHT SIDE SMALL CARDS */}
        <View className="w-[48%]">
          {/* FIRST ROW – 2 CARDS */}
          <View className="flex-row justify-between mb-3">
            {row1Small.slice(0, 2).map((item, i) => (
              <TouchableOpacity
                onPress={() => openCategory(item.slug)}
                key={i}
                className="bg-[#FEFFEC] w-[48%] rounded-xl p-2 shadow-lg shadow-black items-center"
              >
                <Image
                  source={item.image}
                   style={{
                      width: screenWidth * 0.20,   // 20% of screen width
                      height: screenWidth * 0.34,  // 36% of screen width
                    }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* SECOND ROW – 2 CARDS */}
          <View className="flex-row justify-between">
            {row1Small.slice(2, 4).map((item, i) => (
              <TouchableOpacity
                onPress={() => openCategory(item.slug)}
                key={i}
                className="bg-[#FEFFEC] w-[48%] rounded-xl p-2 shadow-lg shadow-black items-center"
              >
                <Image
                  source={item.image}
                  style={{
                      width: screenWidth * 0.20,   // 20% of screen width
                      height: screenWidth * 0.34,  // 36% of screen width
                    }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* ROW 2 — 4 SMALL CARDS */}
      <View className="flex-row justify-between mt-4">
        {row2Small.map((item, i) => (
          <TouchableOpacity
            onPress={() => openCategory(item.slug)}
            key={i}
            className="bg-[#FEFFEC] w-[23%] rounded-xl p-3 shadow-lg shadow-black items-center"
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
