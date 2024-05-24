import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import BouncyView from "@/components/BouncyView";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuButton from "@/components/MenuButtons";
import TypingEffect from "@/components/TypingEffect";

const Home = () => {
  return (
    <View className="flex-1 bg-[#0E2954]">
      <Image
        contentFit="cover"
        className="w-screen h-[45%]"
        source={require("@/assets/images/Designer (2).jpeg")}
      />

      <View className="absolute justify-center item-center top-11 left-7">
        <TypingEffect
          className="bg-transparent font-[Jersey20Charted] text-blue-800 uppercase text-sm p-1"
          loop={true}
          duration={80}
          delay={2000}
          children={[
            "Welcome!",
            "@ Jyeshtha Motors",
            "Manguli, Cuttack-754025, Odisha",
            "PH: 0671-2355666",
          ]}
        />
      </View>

      <Link
        href={"(tabs)/profile"}
        className="absolute justify-center item-center top-8 right-7"
      >
        <BouncyView bounceCount={2}>
          <View className="bg-blue-700 rounded-full w-10 p-1 justify-center items-center h-10">
            <FontAwesome name="user" size={30} color={"white"} />
          </View>
        </BouncyView>
      </Link>

      {/* View Balance */}

      <Link href={"(menus)/account"} className="absolute top-60 left-[30%]">
        <BouncyView bounceCount={2}>
          <View className="bg-white flex flex-row rounded-3xl gap-x-4 items-center w-40 h-10">
            <FontAwesome name="rupee" size={20} color={"#2E8A99"} />
            <Text className="font-[PlayBold]">View Balance</Text>
          </View>
        </BouncyView>
      </Link>

      {/* Menu Buttons */}

      <View className="flex-1 flex-row flex-wrap justify-evenly mt-5">
        <MenuButton text="History" routeName="(menus)/history">
          <FontAwesome name="history" size={25} color={"white"} />
        </MenuButton>
        <MenuButton text="Account" routeName="(menus)/account">
          <MaterialIcons
            name="account-balance-wallet"
            size={25}
            color="white"
          />
        </MenuButton>
        <MenuButton text="Redeem" routeName="(menus)/history">
          <FontAwesome name="keyboard-o" size={25} color={"white"} />
        </MenuButton>
      </View>

      {/* Scanner Button */}

      <Link
        href={"(menus)/scanner"}
        className="absolute bottom-0 left-[41%] mb-4"
      >
        <BouncyView>
          <View className="bg-[#0E2954] rounded-full w-30 h-30 justify-center items-center border-[2px] border-white p-2">
            <Ionicons name="scan" size={40} color="white" />
          </View>
        </BouncyView>
      </Link>
    </View>
  );
};

export default Home;
