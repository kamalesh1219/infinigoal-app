import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Download, Eye, EyeOff, Gauge, List, LogOut, Signpost, User } from "lucide-react-native";
import { login, register, logout, getCurrentUser } from "@/src/services/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

export default function AccountScreen() {
  const [user, setUser] = useState<any>(null);

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Register states
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const u = await getCurrentUser();
    setUser(u);
  };

  // ------------------ LOGIN ----------------------
  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert("Success", "Logged in successfully");
      loadUser();
    } catch (e: any) {
      Alert.alert("Login Failed", e.message);
    }
  };

  // ------------------ REGISTER ----------------------
  const handleRegister = async () => {
    if (!regEmail || !regPassword) {
      return Alert.alert("Error", "Enter email & password");
    }

    try {
      await register(regEmail, regPassword);
      Alert.alert("Account Created", "Please check your email to verify");
    } catch (e: any) {
      Alert.alert("Register Failed", e.message);
    }
  };

  // ------------------ LOGOUT ----------------------
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  // ======================================================
  //         IF LOGGED IN → Show Profile UI
  // ======================================================
  if (user) {
    return (
      <SafeAreaView className="flex-1 bg-white ">
        <Header />

        <View className="mt-10 px-5">
          <Text className="text-3xl font-bold mb-2">My Account</Text>
          <Text className="text-gray-600 mb-8">{user.email}</Text>

        </View>
      <View className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">

      {/* 1. DASHBOARD */}
      <TouchableOpacity className="flex-row items-center py-4">
        <Gauge size={22} color="#2563EB" />
        <Text className="text-lg ml-3 text-blue-600 font-semibold">
          Dashboard
        </Text>
      </TouchableOpacity>

      {/* 2. ORDERS */}
      <TouchableOpacity className="flex-row items-center py-4">
        <List size={22} color="#2563EB" />
        <Text className="text-lg ml-3 text-blue-600">Orders</Text>
      </TouchableOpacity>

      {/* 3. DOWNLOADS */}
      <TouchableOpacity className="flex-row items-center py-4">
        <Download size={22} color="#2563EB" />
        <Text className="text-lg ml-3 text-blue-600">Downloads</Text>
      </TouchableOpacity>

      {/* 4. ADDRESSES */}
      <TouchableOpacity className="flex-row items-center py-4">
        <Signpost size={22} color="#2563EB" />
        <Text className="text-lg ml-3 text-blue-600">Addresses</Text>
      </TouchableOpacity>

      {/* 5. ACCOUNT DETAILS */}
      <TouchableOpacity className="flex-row items-center py-4">
        <User size={22} color="#2563EB" />
        <Text className="text-lg ml-3 text-blue-600">Account details</Text>
      </TouchableOpacity>

      {/* 6. LOGOUT */}
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
  //        IF NOT LOGGED IN → Show Login/Register UI
  // ======================================================

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />

      <ScrollView className="px-5 pt-10">

        <Text className="text-3xl font-bold mb-2">My Account</Text>
        <Text className="text-gray-600 mb-8">Home / My account</Text>

        {/* LOGIN */}
        <Text className="text-xl font-semibold text-center mb-4">Login</Text>

        <View className="border border-gray-200 rounded-xl p-5 mb-10">
          <Text className="font-medium mb-2">Email *</Text>
          <TextInput
            className="border p-3 rounded mb-4 bg-white"
            placeholder="Enter email"
            onChangeText={setEmail}
          />

          <Text className="font-medium mb-2">Password *</Text>
          <View className="flex-row items-center border rounded pr-3 mb-4">
            <TextInput
              className="flex-1 p-3"
              secureTextEntry={!showPass}
              placeholder="Enter password"
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-600 py-3 rounded-full"
          >
            <Text className="text-white font-bold text-center">Log in</Text>
          </TouchableOpacity>
        </View>

        {/* REGISTER */}
        <Text className="text-xl font-semibold text-center mb-4">Register</Text>

        <View className="border border-gray-200 rounded-xl p-5 mb-20">
          <Text className="font-medium mb-2">Email *</Text>
          <TextInput
            className="border p-3 rounded mb-4 bg-white"
            placeholder="Enter email"
            onChangeText={setRegEmail}
          />

          <Text className="font-medium mb-2">Password *</Text>
          <TextInput
            className="border p-3 rounded mb-4 bg-white"
            placeholder="Create password"
            secureTextEntry
            onChangeText={setRegPassword}
          />

          <TouchableOpacity
            onPress={handleRegister}
            className="bg-blue-600 py-3 rounded-full"
          >
            <Text className="text-white text-center font-bold">Register</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
