import { ROUTER_PATHS } from "@/constant/appRoutes";
import { STRINGS } from "@/constant/string";
import { mockPosts, mockUsers } from "@/data";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
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
  const router = useRouter();
  const s = STRINGS.profile;

  const user = mockUsers[0];
  const userPosts = mockPosts.filter((p) => p.author.id === user.id);

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
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={
          <>
            {/* Cover */}
            <Image
              source={{
                uri:
                  user.coverPhoto ||
                  "https://images.unsplash.com/photo-1557683316-973673baf926",
              }}
              style={styles.cover}
            />

            {/* Profile Info */}
            <View style={styles.profileSection}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />

              <Text style={styles.name}>{user.fullName}</Text>
              <Text style={styles.handle}>@{user.username}</Text>

              {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

              {/* Stats */}
              <View style={styles.stats}>
                <View>
                  <Text style={styles.statNumber}>{user.posts}</Text>
                  <Text style={styles.statLabel}>{s.posts}</Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => router.push(ROUTER_PATHS.followers)}
                  >
                    <Text style={styles.statNumber}>{user.followers}</Text>
                    <Text style={styles.statLabel}>{s.followers}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => router.push(ROUTER_PATHS.followings)}
                  >
                    <Text style={styles.statNumber}>{user.following}</Text>
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
            {item.coverImage ? (
              <Image
                source={{ uri: item.coverImage }}
                style={styles.postImage}
              />
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
