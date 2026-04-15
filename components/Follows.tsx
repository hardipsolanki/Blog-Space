import { STRINGS } from "@/constant/string";
import { colors } from "@/theme/colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const renderItem = ({ item }: any) => {
  const s = STRINGS.followers;
  return (
    <View style={styles.row}>
      {/* Left */}
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[styles.followBtn, item.isFollowing && styles.followingBtn]}
      >
        <Text
          style={[styles.followText, item.isFollowing && styles.followingText]}
        >
          {item.isFollowing ? s.following : s.follow}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default renderItem;

const styles = StyleSheet.create({
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
});
