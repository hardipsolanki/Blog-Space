import { ROUTER_PATHS } from "@/constant/appRoutes";
import { STRINGS } from "@/constant/string";
import { getProfile } from "@/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/theme/colors";
import { Post } from "@/types/post";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const screenWidth = Dimensions.get("window").width;
const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { username } = useLocalSearchParams<{ username: string }>();
  const { profile: user, loading } = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.post);
  const router = useRouter();
  const s = STRINGS.profile;

  useEffect(() => {
    if (username) dispatch(getProfile(username as string));
  }, [dispatch, username]);

  const userPosts = posts.posts?.filter(
    (post: Post) => post.owner._id === user?._id,
  );

  if (loading === "pending" || !username || !user || !userPosts) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
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
        <TouchableOpacity>
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
                    onPress={() => router.push(ROUTER_PATHS.followers)}
                  >
                    <Text style={styles.statNumber}>{user.followersCount}</Text>
                    <Text style={styles.statLabel}>{s.followers}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => router.push(ROUTER_PATHS.followings)}
                  >
                    <Text style={styles.statNumber}>{user.followingCount}</Text>
                    <Text style={styles.statLabel}>{s.following}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Follow Button */}
              <TouchableOpacity style={styles.followBtn}>
                <Text style={styles.followText}>{s.follow}</Text>
              </TouchableOpacity>
            </View>

            {/* Tab Title */}
            <View style={styles.tab}>
              <Text style={styles.tabText}>{s.posts}</Text>
              <View style={styles.activeLine} />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>{item.title}</Text>
              </View>
            )}
          </View>
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
