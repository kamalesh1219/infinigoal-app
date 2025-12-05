import React, { useEffect } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function MovingImages() {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-width, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const scrollStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // 🔥 SAFE IMAGE LIST – All broken URLs replaced automatically
  const images = [
    "https://infinigoal.in/wp-content/uploads/elementor/thumbs/Untitled-design-qyoy15dn55g6096u945fi8ngvn764s7l2lkgdknn0k.png",
    "https://infinigoal.in/wp-content/uploads/elementor/thumbs/Grocery-Delivery-Instagram-Post-qzxrggqsqz4nudxlhg4p4m8u4jxg7ly4gbirxdy1c4.png",
    "https://infinigoal.in/wp-content/uploads/elementor/thumbs/Grocery-Delivery-Instagram-Post-1-qzxrvh7zwpoja64itfr6gbuvp3xi5kjs6mmyvhonyc.png",
    "https://infinigoal.in/wp-content/uploads/elementor/thumbs/png-clipart-organic-food-sudhesi-mara-chekku-ennai-thulasi-marachekku-oils-ambigai-marachekku-oils-coconut-oil-oil-organic-food-sudhesi-mara-chekku-ennai-thumbnail-qyiatqv2ud353xqessee9aq4ifpjj1jbs3z8tsvbk4.png",
    "https://infinigoal.in/wp-content/uploads/elementor/thumbs/Kerela-Spices-qyiaimftyxuzq1w1qzbbr3rrgaj6fzdo922edxd16s.jpg",
    "https://infinigoal.in/wp-content/uploads/elementor/thumbs/294643940_447755670694707_5700400513880330612_n-qyiarbg36rrh479dz8m3bes99loen6wag3b372gxms.jpg",
  ];

  // 🔥 A small helper ensures NO EMPTY URL causes warning
  const safeUri = (uri: string) => {
    if (!uri || uri.trim().length < 10) {
      return "https://infinigoal.in/wp-content/uploads/2024/01/no-image.png";
    }
    return uri;
  };

  return (
    <View className="overflow-hidden h-28 bg-white mt-10 mb-5">
      <Text className="font-bold text-2xl text-center mb-6">Our Top Brands</Text>

      <Animated.View
        style={[scrollStyle, { flexDirection: "row", width: width * 2 }]}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            source={{ uri: safeUri(img) }}
            className="w-28 h-28 mx-3"
            resizeMode="contain"
          />
        ))}

        {/* Duplicate for smooth infinite loop */}
        {images.map((img, i) => (
          <Image
            key={`dup-${i}`}
            source={{ uri: safeUri(img) }}
            className="w-28 h-28 mx-3"
            resizeMode="contain"
          />
        ))}
      </Animated.View>
    </View>
  );
}
