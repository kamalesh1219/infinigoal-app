import { useAuth } from "@/providers/AuthProviders";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) return <ActivityIndicator />;

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
