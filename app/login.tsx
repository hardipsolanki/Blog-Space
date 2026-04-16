import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ROUTER_PATHS, TABS_PATHS } from "@/constant/appRoutes";
import { loginUser } from "@/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { STRINGS } from "../constant/string";
import { colors } from "../theme/colors";

type Input = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ user }) => user.loading);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit = (data: Input) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((userData) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: userData.message || "Login successful",
        });

        router.push(TABS_PATHS.Index); // you may want Home here
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Login failed",
        });
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>B</Text>
              </View>

              <Text style={styles.title}>{STRINGS.login.welcomeBack}</Text>
              <Text style={styles.subtitle}>{STRINGS.login.subtitle}</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* EMAIL */}
              <Text style={styles.label}>{STRINGS.login.email}</Text>
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
                  <AppInput
                    placeholder="john@example.com"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}

              {/* PASSWORD */}
              <View style={styles.passwordHeader}>
                <Text style={styles.label}>{STRINGS.login.password}</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>
                    {STRINGS.login.forgotPassword}
                  </Text>
                </TouchableOpacity>
              </View>

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
                  <AppInput
                    placeholder="••••••••"
                    secure
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}

              {/* BUTTON */}
              <View style={{ marginTop: 20 }}>
                <AppButton
                  loading={isLoading === "pending"}
                  onPress={handleSubmit(onSubmit)}
                  title={STRINGS.login.login}
                />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.muted}>{STRINGS.login.noAccount} </Text>
              <TouchableOpacity
                onPress={() => router.push(ROUTER_PATHS.Signup)}
              >
                <Text style={styles.link}>{STRINGS.login.signup}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.light.foreground,
  },
  subtitle: {
    color: colors.light.mutedText,
    marginTop: 6,
  },
  form: {
    gap: 12,
  },
  label: {
    color: colors.light.foreground,
    marginBottom: 6,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: colors.light.primary,
    fontSize: 13,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 30,
  },
  muted: {
    color: colors.light.mutedText,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});
