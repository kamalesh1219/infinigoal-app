import "../global.css";
import { Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import CustomSplash from "../components/CustomSplash";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase"; 
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";

// Don't auto-hide splash
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);

  // Handle font errors
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Hide system splash when fonts load
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // → Show CustomSplash only 2 seconds, then hide
  useEffect(() => {
    if (!fontsLoaded) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  // 🔥 Check supabase auth AFTER splash ends
  useEffect(() => {
    const checkLogin = async () => {
      if (showSplash) return; // wait until splash is gone

      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/sign-in");
      }

      setCheckedAuth(true);
    };

    checkLogin();
  }, [showSplash]);

  // ❗ Wait for fonts + splash + auth check to finish
  if (!fontsLoaded || showSplash || !checkedAuth) {
   return <CustomSplash />;
  }


  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
