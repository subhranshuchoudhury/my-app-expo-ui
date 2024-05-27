import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import useAuthStore from "@/store/auth-store";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMutation } from "@tanstack/react-query";
import loginUser from "@/api-queries/postLogin";
import { Link, useLocalSearchParams } from "expo-router";
import sendOTP from "@/api-queries/postOTP";
import Toast from "react-native-toast-message";

const blurhash = "LG7LG#.9WBWA?w%gWBV@.8%MV@Rj";

const login = () => {
  const { token, removeToken, setToken } = useAuthStore();

  const [IsOTPSent, setIsOTPSent] = useState(false);

  const [loginPayload, setLoginPayload] = useState({
    mobile: "",
    otp: "",
  });

  const params = useLocalSearchParams<{ mobile: string }>();

  console.log(params);

  const handleLoginPayload = (key: string, value: string) => {
    setLoginPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const loginMutation = useMutation({
    mutationFn: (variables: { mobile: string; otp: string }) =>
      loginUser(variables),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data?.tokens?.access_token) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: `Welcome ${data?.data?.name}`,
        });

        setToken(data.tokens.access_token);
      } else {
        Toast.show({
          type: "error",
          text1: data?.response?.error,
          text2: data?.message,
        });
      }
    },
  });

  const preLoginMutation = useMutation({
    mutationFn: (variables: { mobile: string }) => sendOTP(variables),
    onError: (error) => {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Try again",
      });
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data?.message,
        });

        setIsOTPSent(true);
      } else {
        Toast.show({
          type: "error",
          text1: data?.response.error,
          text2: data?.message,
        });
      }
      console.log(data);
    },
  });

  const handleLoginSubmit = (e?: { mobile: string; otp: string }) => {
    console.log("Data", e);

    if (!e?.mobile || !e?.otp) {
      return;
    }

    handleLoginPayload("mobile", e.mobile);

    loginMutation.mutate({
      mobile: e.mobile,
      otp: e.otp,
    });
  };

  const handlePreLoginSubmit = (e?: { mobile: string }) => {
    console.log("Data", e);

    if (!e?.mobile) {
      return;
    }

    handleLoginPayload("mobile", e.mobile);

    preLoginMutation.mutate({
      mobile: e.mobile,
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

  const yupPreLoginSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number should be 10 digits")
      .length(10, "Mobile number should be 10 digits")
      .required("Mobile is required"),
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
          Login
        </Text>
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={-100}
        behavior="padding"
        className="w-full justify-center items-center flex-1"
      >
        {IsOTPSent ? (
          <Formik
            initialValues={{ mobile: loginPayload.mobile, otp: "" }}
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
                  disabled={
                    !values?.mobile ||
                    errors.mobile ||
                    preLoginMutation.isPending ||
                    loginMutation.isPending
                      ? true
                      : false
                  }
                  onPress={() => {
                    preLoginMutation.mutate({ mobile: values?.mobile });
                    values.otp = "";
                  }}
                  className="w-full"
                >
                  <Text className="ml-7 font-[Jaro] text-sky-400">
                    Resend OTP?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={
                    loginMutation.isPending || preLoginMutation.isPending
                      ? true
                      : false
                  }
                  className={[
                    errors.mobile || errors.otp ? "bg-slate-600" : "bg-sky-400",
                    "h-12 w-12 justify-center items-center rounded-full",
                  ].join(" ")}
                  onPress={() => handleSubmit()}
                >
                  {loginMutation.isPending || preLoginMutation.isPending ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <FontAwesome name="arrow-right" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ mobile: params.mobile || "" }}
            onSubmit={(values) => handlePreLoginSubmit(values)}
            validationSchema={yupPreLoginSchema}
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

                <TouchableOpacity
                  disabled={
                    !values?.mobile ||
                    errors.mobile ||
                    preLoginMutation.isPending
                      ? true
                      : false
                  }
                  onPress={() => {
                    preLoginMutation.mutate({ mobile: values?.mobile });
                  }}
                  className="w-full"
                >
                  <Text className="ml-7 font-[Jaro] text-sky-400">
                    Resend OTP?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={preLoginMutation.isPending ? true : false}
                  className={[
                    errors.mobile ? "bg-slate-600" : "bg-sky-400",
                    "h-12 w-12 justify-center items-center rounded-full",
                  ].join(" ")}
                  onPress={() => handleSubmit()}
                >
                  {preLoginMutation.isPending ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <FontAwesome name="arrow-right" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        )}

        <Link className="mt-5" href={"/register"}>
          <Text className="text-slate-500 text-xs mt-5 font-[Jaro]">
            Don't have an account?{" "}
            <Text className="text-sky-400">Register</Text>
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
