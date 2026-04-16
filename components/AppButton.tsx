import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
  loading?: boolean;
};

export const AppButton = ({
  title,
  onPress,
  style,
  loading = false,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, loading && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.light.primaryText} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
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
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: colors.light.primaryText,
    fontSize: 16,
    fontWeight: "600",
  },
});
