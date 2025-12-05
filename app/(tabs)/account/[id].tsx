import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Details() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Detail Page</Text>
      <Text>Id: {id}</Text>
    </View>
  );
}
