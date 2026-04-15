import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { ROUTER_PATHS } from "@/constant/appRoutes";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { STRINGS } from "../constant/string";
import { colors } from "../theme/colors";

type Input = {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  coverImage: string;
};

const SignupScreen = () => {
  const router = useRouter();
  const s = STRINGS.signup;

  const [avatar, setAvatar] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  const pickImage = async (type: "avatar" | "cover") => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required.");
      return;
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: type === "avatar" ? [1, 1] : [16, 9],
    });

    if (!response.canceled) {
      const uri = response.assets[0].uri;

      if (type === "avatar") {
        setAvatar(uri);
        setValue("avatar", uri);
      } else {
        setCoverImage(uri);
        setValue("coverImage", uri);
      }
    }
  };

  const onSubmit = (data: Input) => {
    if (!avatar) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select an avatar image.",
      });
      return;
    }
    // dispatch
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          {/* Cover Image */}
          <TouchableOpacity onPress={() => pickImage("cover")}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.cover} />
            ) : (
              <View style={styles.coverPlaceholder}>
                <Text>Select Cover Image</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Avatar */}
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => pickImage("avatar")}
          >
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text>Pick Avatar</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Form */}
          <View style={styles.form}>
            <Text>{s.fullName}</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}

            <Text>{s.name}</Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: "Username is required",
                minLength: { value: 3, message: "Min 3 characters" },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput value={value} onChangeText={onChange} />
              )}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}

            <Text>{s.email}</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput value={value} onChangeText={onChange} />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Text>{s.password}</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput value={value} onChangeText={onChange} secure />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            <View style={{ marginTop: 20 }}>
              <AppButton
                title={s.createAccount}
                onPress={handleSubmit(onSubmit)}
              />
            </View>

            <View style={styles.footer}>
              <Text>{s.alreadyAccount}</Text>
              <TouchableOpacity onPress={() => router.push(ROUTER_PATHS.Login)}>
                <Text style={styles.link}>{s.login}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  inner: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  cover: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  coverPlaceholder: {
    height: 150,
    borderRadius: 12,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: -40,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    gap: 10,
  },

  error: {
    color: "red",
    fontSize: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  link: {
    color: colors.light.primary,
    fontWeight: "600",
  },
});
