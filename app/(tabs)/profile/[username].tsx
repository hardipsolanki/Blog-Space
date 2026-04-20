import { SkeletonProfileScreen } from "@/components/skeleton/SkeletonProfileScreen";
import { ROUTER_PATHS } from "@/constant/appRoutes";
import { STRINGS } from "@/constant/string";
import { getUserPosts } from "@/features/posts/postSlice";
import { followUnfollow, getProfile } from "@/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const screenWidth = Dimensions.get("window").width;
const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { username, userId } = useLocalSearchParams<{
    username: string;
    userId: string;
  }>();
  const {
    profile: user,
    userData,
    loading,
    folowersLoading,
  } = useAppSelector((state) => state.user);
  const { userPosts, loading: postLoading } = useAppSelector(
    ({ post }) => post,
  );
  const router = useRouter();
  const s = STRINGS.profile;

  const handleFollowUnfollow = () => {
    dispatch(followUnfollow(userId))
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

  useEffect(() => {
    if (!username || !userId) return;
    Promise.all([
      dispatch(getProfile(username as string)),
      dispatch(getUserPosts(userId)),
    ]);
  }, [dispatch, username]);

  if (loading === "pending" || postLoading === "pending" || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <SkeletonProfileScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.username}>@{user.username}</Text>
        <TouchableOpacity onPress={() => router.push(ROUTER_PATHS.setting)}>
          <Ionicons name="settings-outline" size={24} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <>
            {/* Cover */}
            <Image
              source={{
                uri:
                  user.coverImage ||
                  "https://images.unsplash.com/photo-1557683316-973673baf926",
              }}
              style={styles.cover}
            />

            {/* Profile Info */}
            <View style={styles.profileSection}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />

              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.handle}>@{user.username}</Text>

              {/* {user.bio && <Text style={styles.bio}>{user.bio}</Text>} */}

              {/* Stats */}
              <View style={styles.stats}>
                <View>
                  <Text style={styles.statNumber}>{userPosts?.length}</Text>
                  <Text style={styles.statLabel}>{s.posts}</Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: ROUTER_PATHS.followers,
                        params: { userId: user._id },
                      })
                    }
                  >
                    <Text style={styles.statNumber}>{user.followersCount}</Text>
                    <Text style={styles.statLabel}>{s.followers}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: ROUTER_PATHS.followings,
                        params: { userId: user._id },
                      })
                    }
                  >
                    <Text style={styles.statNumber}>{user.followingCount}</Text>
                    <Text style={styles.statLabel}>{s.following}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Follow Button */}
              {user._id !== userData?._id && (
                <TouchableOpacity
                  onPress={handleFollowUnfollow}
                  disabled={folowersLoading === "pending"}
                  style={styles.followBtn}
                >
                  <Text style={styles.followText}>
                    {user.isFollowed ? s.unfollow : s.follow}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Tab Title */}
            <View style={styles.tab}>
              <Text style={styles.tabText}>{s.posts}</Text>
              <View style={styles.activeLine} />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Link href={`/post-details/${item._id}`}>
            <View style={styles.gridItem}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.postImage} />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>{item.title}</Text>
                </View>
              )}
            </View>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  username: {
    fontWeight: "600",
    color: colors.light.foreground,
  },

  /* COVER */
  cover: {
    width: "100%",
    height: 150,
  },

  /* PROFILE */
  profileSection: {
    padding: 16,
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.light.background,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.light.foreground,
  },
  handle: {
    color: colors.light.mutedText,
    marginBottom: 8,
  },
  bio: {
    marginBottom: 10,
    color: colors.light.foreground,
  },

  /* STATS */
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  statNumber: {
    fontWeight: "700",
    color: colors.light.foreground,
    textAlign: "center",
  },
  statLabel: {
    color: colors.light.mutedText,
    fontSize: 12,
    textAlign: "center",
  },

  /* FOLLOW BUTTON */
  followBtn: {
    backgroundColor: colors.light.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  followText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* TAB */
  tab: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.light.border,
    paddingVertical: 12,
  },
  tabText: {
    fontWeight: "600",
    color: colors.light.foreground,
  },
  activeLine: {
    height: 2,
    width: 60,
    backgroundColor: colors.light.primary,
    marginTop: 6,
  },

  /* GRID */
  gridItem: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    padding: 2,
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.light.muted,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 12,
    textAlign: "center",
  },
});
