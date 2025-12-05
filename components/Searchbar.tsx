import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Searchbar() {
  return (
    <View className="px-4 my-3">
     <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 shadow-sm ">
      <Ionicons name="search" size={20} color="#6B7280" />
       <TextInput
         placeholder="What’s on your list?"
         placeholderTextColor="#6B7280"
         className="ml-2 flex-1 text-gray-700"
        />
     </View>
    </View>
       
  );
}