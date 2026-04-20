import { AppButton } from "@/components/AppButton";
import { ROUTER_PATHS } from "@/constant/appRoutes";
import { STRINGS } from "@/constant/string";
import { logoutUser } from "@/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const setting = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ user }) => user.loading);
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message,
        });

        router.push(ROUTER_PATHS.Login);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "logout failed",
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.settingText}>{STRINGS.setting.title}</Text>
      </View>
      <View style={styles.mainConatiner}>
        <Text>{STRINGS.setting.description}</Text>
        <AppButton
          loading={isLoading === "pending"}
          style={styles.logOutBtn}
          onPress={handleLogout}
          title={STRINGS.setting.logout}
        />
      </View>
    </SafeAreaView>
  );
};

export default setting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  settingText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.light.foreground,
  },
  header: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainConatiner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logOutBtn: {
    width: "100%",
    marginTop: 20,
  },
});
