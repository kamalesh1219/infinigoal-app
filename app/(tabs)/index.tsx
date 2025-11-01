import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Header from "@/components/Header";
import { getDueText } from "@/utils/dateUtils";

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: string;
  status: "new" | "scheduled" | "progress" | "completed";
};

export default function Kanban( ) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"new" | "scheduled" | "progress" | "completed">("new");
  const [modalVisible, setModalVisible] = useState(false);

  // form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState("None");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  };

  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      assignee,
      dueDate: dueDate ? dueDate.toDateString() : "No date",
      priority,
      status: "new",
    };
    const updated = [...tasks, newTask];
    saveTasks(updated);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAssignee("");
    setDueDate(null);
    setPriority("None");
    setModalVisible(false);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const tabs = [
    { key: "new", title: "New Task" },
    { key: "scheduled", title: "Scheduled" },
    { key: "progress", title: "In Progress" },
    { key: "completed", title: "Completed" },
  ];

  const filtered = tasks.filter((t) => t.status === activeTab);

  return (
    <SafeAreaView className="flex-1 bg-white mb-24">
      <Header title="My work" />

      {/* Tabs */}
   
      <View className="flex-row justify-around items-center border-b border-gray-200 bg-white py-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tasks.filter((t) => t.status === tab.key).length;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as Task["status"])}
              className={`px-3 py-1 rounded-full ${
                isActive ? "border-b-4 border-blue-500" : ""
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  isActive ? "text-blue-200" : "text-gray-600"
                }`}
              >
                {tab.title} ({count})
              </Text>
            </TouchableOpacity>
            
          );
        })}
      </View>
      

      {/* Task list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            No tasks in {activeTab} list
          </Text>
        }
        renderItem={({ item }) => (
          <View className="bg-blue-100 px-5 py-4 mx-4 my-4 rounded-xl flex-row justify-between items-center ">
            <View className="flex-row items-center space-x-3">
              <View className="bg-purple-600 rounded-full w-9 h-9 flex items-center justify-center ">
                <Text className="text-white font-bold text-base">
                  {item.title.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="pl-2 ">
                <Text className="text-gray-800 font-semibold text-lg">
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-sm pt-2">
                    {item.assignee ? `👤 ${item.assignee}` : " "}
                    {item.status}
                  </Text>
                <Text className="text-gray-500 text-sm pt-2">
                  {getDueText(item.dueDate)}
                </Text>               
              </View>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Create Task Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 rounded-2xl p-5">
            <Text className="text-2xl font-semibold mb-4">Create Task</Text>

            {/* Task Name */}
            <Text className="text-base font-semibold mb-1">Task Name</Text>
            <TextInput
              placeholder="Enter task name..."
              value={title}
              onChangeText={setTitle}
              className="border border-gray-300 rounded-lg px-2 py-4 mb-3"
            />

            {/* Description */}
            <Text className="text-base font-semibold mb-1">Description</Text>
            <TextInput
              placeholder="Describe the task..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              className="border border-gray-300 rounded-lg px-2 py-4 mb-3 text-gray-700"
            />

            {/* Assignee */}
            <Text className="text-base font-semibold mb-1">Assignee</Text>
            <TextInput
              placeholder="Assignee to..."
              value={assignee}
              onChangeText={setAssignee}
              className="border border-gray-300 rounded-lg px-2 py-4 mb-3"
            />

            {/* Date & Priority Row */}
            <View className="flex-row justify-between mb-3">
              <View className="w-[48%]">
                <Text className="text-base font-semibold mb-1">Due Date</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="border border-gray-300 rounded-lg px-2 py-3"
                >
                  <Text className="text-gray-600">
                    {dueDate ? dueDate.toLocaleDateString() : "Select date"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={dueDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setDueDate(selectedDate);
                    }}
                  />
                )}
              </View>

              <View className="w-[48%]">
                <Text className="text-base font-semibold mb-1">Priority</Text>
                <View className="border border-gray-300 rounded-lg">
                  <Picker
                    selectedValue={priority}
                    onValueChange={(v) => setPriority(v)}
                    style={{ height: 40 }}
                  >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="High" value="High" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity
                onPress={resetForm}
                className="px-4 py-2 rounded-lg mr-2 bg-gray-300"
              >
                <Text>Cancel  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddTask}
                className="px-4 py-2 rounded-lg bg-blue-600 "
              >
                <Text className="text-white font-medium">Create Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
