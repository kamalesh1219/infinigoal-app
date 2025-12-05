import { openCategory } from "@/src/utils/navigation";
import React from "react";
import { View, Text, Image, TouchableOpacity,Dimensions } from "react-native";


interface CardType {
   title: string;
   image: {
    uri: string;
    slug: string;
  };
}

export default function HomeCategories({ title, smallCards}: any) {

const screenWidth = Dimensions.get("window").width;

  return (
    <View className="px-4 mt-12">
      {/* Heading */}
      <Text className="text-2xl italic font-bold text-gray-800 mb-7 text-center ">
      {title}
      </Text>

      <View className="flex-row flex-wrap justify-around mt-2 ">
        {smallCards.map((item: CardType, i:number) => (
          <TouchableOpacity
           onPress={() => openCategory(item.image.slug)}
            key={i}
            className="w-[23%] bg-[#FEFFEC] rounded-2xl p-3 shadow-lg shadow-black  items-center mb-4"
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