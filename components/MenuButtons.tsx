import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface MenuButtonProps {
  text: string;
  routeName?: string;
  children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  text = "noname",
  routeName = "/",
  children,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(routeName)}>
      <View className="flex-col items-center m-2 bg-blue-800 w-16 h-16 rounded-md justify-center">
        {children}
        <Text className="text-white text-[12px] mt-0.5 font-[PlayRegular]">
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuButton;
