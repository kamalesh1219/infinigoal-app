import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { allProducts } from "@/src/data/allProducts";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryPage() {
  const { slug } = useLocalSearchParams();

  // Filter products by category slug
  const categoryProducts = allProducts.filter(
    (p) => p.category?.toLowerCase() === slug?.toLowerCase()
  );

  // Format title: convert slug → Title Case
  const pageTitle =
    slug?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase()) || "";

  return (
    <>
      <Stack.Screen
        options={{
          title: pageTitle,
          headerBackTitle: "Back",
        }}
      />

      <ScrollView className="bg-white flex-1">

        {/* ======= PAGE TITLE ======= */}
        <View className="px-4 mt-4">
          <Text className="text-2xl font-bold">Tag: {pageTitle}</Text>

          {/* ======= BREADCRUMB ======= */}
          <Text className="text-gray-600 mt-1">
            Home / Products tagged "
            <Text className="text-black font-semibold">{pageTitle}</Text>"
          </Text>
        </View>

      </ScrollView>
    </>
  );
}
