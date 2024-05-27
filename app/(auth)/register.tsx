import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import useAuthStore from "@/store/auth-store";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import registerUser from "@/api-queries/postRegister";
import Toast from "react-native-toast-message";

const blurhash = "LG7LG#.9WBWA?w%gWBV@.8%MV@Rj";

const register = () => {
  const { token, removeToken, setToken } = useAuthStore();

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (variables: { mobile: string; name: string }) =>
      registerUser(variables),

    onError: (error) => {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Try again",
      });
    },
    onSuccess: (data) => {
      if (data?.response?.error) {
        Toast.show({
          type: "error",
          text1: data?.response?.error,
          text2: data?.message,
        });
        return;
      }

      if (data?.status === 201) {
        router.push(`/login?mobile=${data.data.mobile.replace("+91", "")}`);
      } else {
        Toast.show({
          type: "error",
          text1: data?.error || "Error",
          text2: data?.message,
        });
      }
      console.log(data);
    },
  });

  const handleLoginSubmit = (e?: { mobile: string; name: string }) => {
    console.log("Data", e);

    if (!e?.mobile || !e?.name) {
      return;
    }

    registerMutation.mutate({
      mobile: e.mobile,
      name: e.name,
    });
  };

  const yupLoginSchema = Yup.object().shape({
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]+$/, "Mobile number should be 10 digits")
      .length(10, "Mobile number should be 10 digits"),
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z ]+$/, "Name should contain only alphabets")
      .max(30, "Name should be less than 30 characters")
      .min(3, "Name should be more than 3 characters"),
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
          initialValues={{ mobile: "", name: "" }}
          onSubmit={(values) => handleLoginSubmit(values)}
          validationSchema={yupLoginSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="justify-center items-center gap-y-5 w-[70%] bg-white rounded-sm pb-5">
              <TextInput
                className="border-b rounded-lg border-black w-[80%] h-10"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Name"
                keyboardType="default"
              />
              {errors.name && (
                <Text className="text-[10px] text-red-400">{errors.name}</Text>
              )}

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
                disabled={registerMutation.isPending ? true : false}
                className={[
                  errors.mobile || errors.name ? "bg-slate-600" : "bg-sky-400",
                  "h-12 w-12 justify-center items-center rounded-full",
                ].join(" ")}
                onPress={() => handleSubmit()}
              >
                {registerMutation.isPending ? (
                  <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                  <FontAwesome name="arrow-right" size={24} color="white" />
                )}
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

export default register;
