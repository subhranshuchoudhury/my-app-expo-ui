import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "@/store/auth-store";
import { Formik } from "formik";
import { useVideoPlayer, VideoView } from "expo-video";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";

const videoSource =
  "https://videos.pexels.com/video-files/4488737/4488737-uhd_2160_4096_25fps.mp4";

const login = () => {
  const { token, removeToken, setToken } = useAuthStore();
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleSubmit = (e?: { mobile: string }) => {
    console.log(e);
    setToken("token");
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const yupLoginSchema = Yup.object().shape({
    mobile: Yup.string()
      .required("Mobile is required")
      .length(10, "Mobile number should be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should be atleast 6 characters"),
  });

  return (
    <View className="flex-1">
      <VideoView
        ref={ref}
        player={player}
        className="absolute flex-1 w-full h-full"
        contentFit="fill"
        nativeControls={false}
      />

      <View className="absolute">
        <Text className="text-white text-4xl font-[Jaro] mt-12 ml-5">
          Login
        </Text>
      </View>

      <View className="justify-center items-center flex-1">
        <Formik
          initialValues={{ mobile: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={yupLoginSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="justify-center items-center gap-y-5 w-[70%] bg-white rounded-sm pb-5">
              <TextInput
                className="border-b rounded-lg border-black w-[80%] h-10"
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                value={values.mobile}
                placeholder="Mobile"
                keyboardType="phone-pad"
              />
              {errors.mobile && (
                <Text className="text-[10px] text-red-400">
                  {errors.mobile}
                </Text>
              )}
              <TextInput
                className="border-b rounded-lg border-black w-[80%] h-10"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
              />
              {errors.password && (
                <Text className="text-[10px] text-red-400">
                  {errors.password}
                </Text>
              )}

              <TouchableOpacity
                className={[
                  errors.mobile || errors.password
                    ? "bg-slate-600"
                    : "bg-sky-400",
                  "h-12 w-12 justify-center items-center rounded-full",
                ].join(" ")}
                onPress={() => handleSubmit()}
              >
                <FontAwesome name="arrow-right" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default login;
