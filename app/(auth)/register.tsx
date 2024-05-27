import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import useAuthStore from "@/store/auth-store";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMutation } from "@tanstack/react-query";
import loginUser from "@/api-queries/postLogin";
import { Link } from "expo-router";

const blurhash = "LG7LG#.9WBWA?w%gWBV@.8%MV@Rj";

const login = () => {
  const { token, removeToken, setToken } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (variables: { mobile: string; otp: string }) =>
      loginUser(variables),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleLoginSubmit = (e?: { mobile: string; otp: string }) => {
    console.log("Data", e);

    if (!e?.mobile || !e?.otp) {
      return;
    }

    loginMutation.mutate({
      mobile: e.mobile,
      otp: e.otp,
    });
  };

  const yupLoginSchema = Yup.object().shape({
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]+$/, "Mobile number should be 10 digits")
      .length(10, "Mobile number should be 10 digits"),
    otp: Yup.string()
      .matches(/^[0-9]+$/, "OTP should be a number")
      .required("OTP is required")
      .length(4, "OTP should be 4 digits"),
  });

  return (
    <View className="flex-1">
      <Image
        cachePolicy={"memory"}
        transition={100}
        placeholder={{
          blurhash,
        }}
        source={
          "https://res.cloudinary.com/dkiky4x06/image/upload/v1716810176/4488737-uhd_2160_4096_25fps_ak4jkx.gif"
        }
        className="absolute flex-1 w-full h-full"
      />

      <View className="absolute">
        <Text className="text-white text-4xl font-[Jaro] mt-12 ml-5">
          Register
        </Text>
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={-100}
        behavior="padding"
        className="w-full justify-center items-center flex-1"
      >
        <Formik
          initialValues={{ mobile: "", otp: "" }}
          onSubmit={(values) => handleLoginSubmit(values)}
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
                onChangeText={handleChange("otp")}
                onBlur={handleBlur("otp")}
                value={values.otp}
                placeholder="OTP"
                keyboardType="numeric"
              />
              {errors.otp && (
                <Text className="text-[10px] text-red-400">{errors.otp}</Text>
              )}

              <TouchableOpacity
                disabled={loginMutation.isPending ? true : false}
                className={[
                  errors.mobile || errors.otp ? "bg-slate-600" : "bg-sky-400",
                  "h-12 w-12 justify-center items-center rounded-full",
                ].join(" ")}
                onPress={() => handleSubmit()}
              >
                <FontAwesome name="arrow-right" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Link className="mt-5" href={"/login"}>
          <Text className="text-slate-500 text-xs mt-5 font-[Jaro]">
            Already have an account? <Text className="text-sky-400">Login</Text>
          </Text>
        </Link>
      </KeyboardAvoidingView>

      <View className="items-center">
        <Text className="text-slate-500 text-lg font-[Jaro]">
          Jyeshtha Motors
        </Text>
        <Text className="text-slate-600 text-xs mb-10 font-[Jaro]">
          Manguli Cuttack, 751030, +918249587552
        </Text>
      </View>
    </View>
  );
};

export default login;
