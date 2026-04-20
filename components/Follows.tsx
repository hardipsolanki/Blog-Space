import { TABS_PATHS } from "@/constant/appRoutes";
import { STRINGS } from "@/constant/string";
import { followUnfollow } from "@/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/theme/colors";
import { Followers } from "@/types/folow";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const FollowerItem = (followers: Followers) => {
  const dispatch = useAppDispatch();
  const { folowersLoading, userData } = useAppSelector(({ user }) => user);
  const handleFollowUnfollow = () => {
    dispatch(followUnfollow(followers.followDetails._id))
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Failed to follow user",
        });
      });
  };

  const s = STRINGS.followers;
  return (
    <View style={styles.row}>
      {/* Left */}
      <Link
        href={{
          pathname: TABS_PATHS.UserProfile,
          params: {
            username: followers.followDetails.username,
            userId: followers.followDetails._id,
          },
        }}
      >
        <View style={styles.userInfo}>
          <Image
            source={{ uri: followers.followDetails.avatar }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{followers.followDetails.name}</Text>
            <Text style={styles.username}>
              @{followers.followDetails.username}
            </Text>
          </View>
        </View>
      </Link>

      {/* Button */}
      {userData?._id === followers.followDetails._id ? (
        <View style={styles.followBtn}>
          <Text style={styles.followText}>{s.you}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleFollowUnfollow}
          disabled={folowersLoading === "pending"}
          style={[
            styles.followBtn,
            followers.followDetails.isFollowed && styles.followingBtn,
          ]}
        >
          <Text
            style={[
              styles.followText,
              followers.followDetails.isFollowed && styles.followingText,
            ]}
          >
            {followers.followDetails.isFollowed ? s.following : s.follow}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FollowerItem;

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
