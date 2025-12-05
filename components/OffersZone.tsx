import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function OffersZone () {
  const calculateTime = () => {
    const target = new Date();
    target.setHours(11, 11, 0, 0); // 11:11 AM today

    const now = new Date();
    if (now > target) {
      target.setDate(target.getDate() + 1); // next day
    }

    const diff = target.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Item = ({ value, label }: { value: number; label: string }) => (
    <View className="items-center ">
      <View className="bg-[#3B0000] w-24 h-24 rounded-b-full items-center justify-center border border-white">
        <Text className="text-2xl font-extrabold text-yellow-400">
          {String(value).padStart(2, "0")}
        </Text>
        <Text className="mt-2 text-sm font-semibold text-white">{label}</Text>
      </View>
      
    </View>
  );

  return (
    <LinearGradient
      colors={["#EAF1FF", "#668CFF"]}
      className="rounded-b-full pb-10 pt-8 mt-10"
    >
      {/* Heading */}
      <Text className="text-center text-3xl font-extrabold text-blue-900 mb-4">
        POWER OF H⏳UR 🎉
      </Text>

      {/* Countdown Row */}
      <View className="flex-row justify-center space-x-4 mb-4">
        <Item value={time.days} label="DAYS" />
        <Item value={time.hours} label="HOURS" />
        <Item value={time.minutes} label="MINUTES" />
        <Item value={time.seconds} label="SECONDS" />
      </View>

      <Text className="text-center text-black mt-2 mb-6 text-base">
        Ready to Buy This Product
      </Text>

      <Text className="text-center mt-4 text-xl text-white font-bold italic">
        Only 11 Minutes at 11:11!
      </Text>

      <Text className="text-center mt-2 text-2xl font-extrabold text-white">
        The Magic Hour for
      </Text>

      <Text className="text-center mt-4 text-3xl font-extrabold text-green-700">
        Biggest Discounts
      </Text>
    </LinearGradient>
  );
}
