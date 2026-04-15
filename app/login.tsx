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

import { ROUTER_PATHS } from "@/constant/appRoutes";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { STRINGS } from "../constant/string";
import { colors } from "../theme/colors";
const LoginScreen = () => {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
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

            {/* Inputs */}
            <View style={styles.form}>
              <Text style={styles.label}>{STRINGS.login.email}</Text>
              <AppInput placeholder="john@example.com" />

              <View style={styles.passwordHeader}>
                <Text style={styles.label}>{STRINGS.login.password}</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>
                    {STRINGS.login.forgotPassword}
                  </Text>
                </TouchableOpacity>
              </View>

              <AppInput placeholder="••••••••" secure />

              <View style={{ marginTop: 20 }}>
                <AppButton title={STRINGS.login.login} />
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
});
