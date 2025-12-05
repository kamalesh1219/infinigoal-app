import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleProducts = [
  { id: "101", name: "Groundnut Oil 1L" },
  { id: "102", name: "Coconut Oil 1L" },
  { id: "103", name: "Gingelly Oil 1L" },
  { id: "104", name: "Raw Rice 5kg" },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const filtered = sampleProducts.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (

    
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search for oils, masala, rice..."
        style={styles.searchBar}
        value={query}
        onChangeText={setQuery}
      />

      

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/ (tabs)/search/${item.id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1, backgroundColor: "#fff" },
  searchBar: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  item: {
    padding: 15,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemText: { fontSize: 16, fontWeight: "500" },
});
