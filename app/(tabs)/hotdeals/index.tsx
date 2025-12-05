import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HotDealsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔥 Hot Deals</Text>
      <Text>Today's offers and discounts will show here.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
});
