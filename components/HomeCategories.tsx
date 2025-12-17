import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { openCategory } from "@/src/utils/navigation";

type CategoryItem = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  card_type: string;
};

export default function HomeCategories({ groupName }: { groupName: string }) {
  const screenWidth = Dimensions.get("window").width;

  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHomeCare = async () => {
    setLoading(true);

    const { data, error } = await supabase
    .from("category_items")
    .select("id,title,slug,image_url,card_type,display_order")
    .eq("category_group_name", groupName)
    .order("display_order", { ascending: true });

    if (!error && data) {
      setItems(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadHomeCare();
  }, []);

  if (loading) {
    return (
      <View className="mt-12 items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="px-4 mt-12">
      {/* Heading */}
      <Text className="text-2xl italic font-bold text-gray-800 mb-7 text-center">
        {groupName}
      </Text>

      <View className="flex-row flex-wrap justify-around mt-2">
        {items.map((item) => (
          <TouchableOpacity
            onPress={() => openCategory(item.slug)}
            key={item.id}
            className="w-[23%] bg-[#FEFFEC] rounded-2xl p-3 shadow-lg shadow-black items-center mb-4"
          >
            <Image
              source={{ uri: item.image_url }}
              style={{
                width: "100%",
                height: screenWidth * 0.30,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
