import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, FlatList,Modal, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  };

  const saveNotes = async (newNotes: any) => {
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!text.trim()) return;
    const newNotes = [...notes, { id: Date.now().toString(), text }];
    saveNotes(newNotes);
    setText("");
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((n: any) => n.id !== id);
    saveNotes(newNotes);
  };

  const resetForm = () => {
   setModalVisible(false)
  };

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      <Header title="Notes" />

       <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-gray-100 rounded-lg p-3 mb-2">
              <Text className="text-gray-700">{item.text}</Text>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text className="text-red-500 font-bold">X</Text>
              </TouchableOpacity>
            </View>
          )}
        />

     
      {/* Floating Add Button */}
          <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg mb-24"
          >
              <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>

          {/* Create Task Modal */}
              <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(true)}
              >
                  
        <View className="mt-24 p-4 bg-white">
          <Text className="text-lg font-semibold flex-1 ">Title</Text>
          <View className="flex-row mb-4">         
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
              placeholder="Write a note..."
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity
              onPress={addNote}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Add</Text>
            </TouchableOpacity>
          
          </View>
            {/* Buttons */}
              <View className="flex-row justify-end mt-2">
                  <TouchableOpacity
                  onPress={resetForm}
                  className="px-4 py-2 rounded-lg mr-2 bg-gray-300"
                  >
                  <Text>Cancel  </Text>
                  </TouchableOpacity>
              </View>         
        </View>
       </Modal>
    </SafeAreaView>
  );
}