import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function HomeDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Details Screen</Text>
      <Text style={{ marginTop: 10 }}>Item ID: {id}</Text>
    </View>
  );
}
