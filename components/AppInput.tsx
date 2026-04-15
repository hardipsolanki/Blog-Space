import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../theme/colors";

type AppInputProps = TextInputProps & {
  secure?: boolean;
};

export const AppInput: React.FC<AppInputProps> = ({
  secure = false,
  style,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        placeholderTextColor={colors.light.mutedText}
        secureTextEntry={secure && !show}
        style={[styles.input, style]}
      />

      {secure && (
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.icon}>
          <Ionicons
            name={show ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.light.mutedText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.light.border,
    padding: 12,
    borderRadius: 8,
    paddingRight: 40, // ✅ space for eye icon
    color: colors.light.foreground,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});
