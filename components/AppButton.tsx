import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

export const AppButton = ({ title, onPress, style }: any) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: colors.light.primaryText,
    fontSize: 16,
    fontWeight: "600",
  },
});
