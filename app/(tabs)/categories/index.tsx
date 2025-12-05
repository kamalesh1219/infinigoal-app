import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: "oil", name: "Oils" },
  { id: "rice", name: "Rice" },
  { id: "masala", name: "Masala" },
  { id: "dryfruits", name: "Dry Fruits" },
];

export default function Categories() {
  return (
    <SafeAreaView style={styles.container}>
      {categories.map((c) => (
        <Link href={`/ (tabs)/categories/${c.id}`} asChild key={c.id}>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.text}>{c.name}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  box: { padding: 20, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, marginBottom: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
