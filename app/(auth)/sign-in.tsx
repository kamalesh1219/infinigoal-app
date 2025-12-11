import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import type { User } from "@supabase/supabase-js";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // 🔍 CHECK USER SESSION ONCE
  // ---------------------------
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setChecking(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Prevent UI appearing before session check
  if (checking) return null;

  // ------------------------------------
  // ⭐ LOGIN FUNCTION
  // ------------------------------------
  async function SignInwithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Enter both email and password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (error) {
      Alert.alert("Login Failed", error.message);
      return;
    }

    router.replace("/(tabs)/home");
  }

  // =====================================================
  //  UI: IF USER IS ALREADY LOGGED IN
  // =====================================================
  if (user) {
    return (
      <View className="flex-1 bg-white justify-center px-6">
        <Text className="text-3xl font-bold text-center text-black mb-4">
          You are already signed in 🎉
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/home")}
          className="bg-orange-500 rounded-full py-4 mt-4"
        >
          <Text className="text-center text-white font-bold text-lg">
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // =====================================================
  //  UI: SIGN-IN FORM (ONLY WHEN LOGGED OUT)
  // =====================================================
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white justify-center px-6"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text className="text-3xl font-bold text-center text-black mb-2">
        Welcome Back 👋
      </Text>

      <Text className="text-center text-gray-600 mb-10">
        Login to continue shopping with InfiniGoal
      </Text>

      {/* Email */}
      <Text className="text-gray-700 mb-1">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-xl p-3 mb-4 bg-white"
        placeholder="example@gmail.com"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text className="text-gray-700 mb-1">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 rounded-xl p-3 mb-4 bg-white"
        placeholder="Enter password"
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={SignInwithEmail}
        disabled={loading}
        className="bg-orange-500 rounded-full py-4 mt-2"
      >
        <Text className="text-center text-white font-bold text-lg">
          {loading ? "Logging in..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-600">New user? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
          <Text className="text-orange-600 font-semibold">
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
