import renderItem from "@/components/Follows";
import { STRINGS } from "@/constant/string";
import { mockUsers } from "@/data";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FollowingsScreen = () => {
  const router = useRouter();
  const s = STRINGS.following;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>{s.title}</Text>

        {/* empty view for spacing */}
        <View style={{ width: 24 }} />
      </View>

      {/* List */}
      <FlatList
        data={mockUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </SafeAreaView>
  );
};

export default FollowingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.light.border,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.light.foreground,
  },

  /* ROW */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },

  name: {
    fontWeight: "600",
    color: colors.light.foreground,
  },

  username: {
    fontSize: 12,
    color: colors.light.mutedText,
  },

  /* BUTTON */
  followBtn: {
    backgroundColor: colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  followingBtn: {
    backgroundColor: colors.light.secondary,
    borderWidth: 1,
    borderColor: colors.light.border,
  },

  followText: {
    color: "#fff",
    fontWeight: "600",
  },

  followingText: {
    color: colors.light.foreground,
  },

  divider: {
    height: 1,
    backgroundColor: colors.light.border,
    marginHorizontal: 16,
  },
});
