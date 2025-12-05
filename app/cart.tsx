import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Cart Here</Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
