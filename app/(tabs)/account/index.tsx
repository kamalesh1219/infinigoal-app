import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Download, Gauge, List, LogOut, Signpost, User } from "lucide-react-native";
import { login, register, logout, getCurrentUser } from "@/src/services/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { router } from "expo-router";

export default function AccountScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const u = await getCurrentUser();
    setUser(u);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  // ======================================================
  //                IF USER LOGGED IN
  // ======================================================
  if (user) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header />

        {/* Title */}
        <View className="mt-10 px-5">
          <Text className="text-3xl font-bold mb-2">My Account</Text>
          <Text className="text-gray-600 mb-8">{user.email}</Text>
        </View>

        {/* Menu Box */}
        <View className="bg-white mx-5 p-5 rounded-xl shadow-sm border border-gray-200">

          <TouchableOpacity className="flex-row items-center py-4">
            <Gauge size={22} color="#2563EB" />
            <Text className="text-lg ml-3 text-blue-600 font-semibold">Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4">
            <List size={22} color="#2563EB" />
            <Text className="text-lg ml-3 text-blue-600">Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4">
            <Download size={22} color="#2563EB" />
            <Text className="text-lg ml-3 text-blue-600">Downloads</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4">
            <Signpost size={22} color="#2563EB" />
            <Text className="text-lg ml-3 text-blue-600">Addresses</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4">
            <User size={22} color="#2563EB" />
            <Text className="text-lg ml-3 text-blue-600">Account details</Text>
          </TouchableOpacity>

          {/* LOGOUT */}
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={handleLogout}
          >
            <LogOut size={22} color="#2563EB" />
            <Text className="text-lg ml-3 text-blue-600">Log out</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  // ======================================================
  //              IF USER **NOT** LOGGED IN
  // ======================================================

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />

      <View className="flex-1 items-center justify-center px-6">

        {/* Illustration */}
        <Image
          source={{ uri: "https://infinigoal.in/wp-content/uploads/2025/01/login.png" }}
          className="w-52 h-52 mb-5"
          resizeMode="contain"
        />

        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to InfiniGoal
        </Text>

        <Text className="text-gray-500 text-center mb-6">
          Login to track orders, manage your account and earn rewards.
        </Text>

        {/* FIXED ROUTER PATH */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in")}
          className="bg-blue-600 w-full py-4 rounded-full"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Login / Register
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
