import { PostCard } from "@/components/PostCard";
import { SkeletonPostCard } from "@/components/skeleton/SkeletonPostCard";
import { STRINGS } from "@/constant/string";
import { getPosts } from "@/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/theme/colors";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { loading, posts, comments } = useAppSelector(({ post }) => post);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"all" | "following">("all");
  const s = STRINGS.home;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading === "pending" || !posts?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5]} // Show 5 skeletons
          renderItem={() => <SkeletonPostCard />}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>B</Text>
          </View>
          <Text style={styles.title}>{s.title}</Text>
        </View>

        {/* <View style={styles.icons}>
          <Ionicons name="search-outline" size={22} />
          <Ionicons name="notifications-outline" size={22} />
        </View> */}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("all")}
          style={[styles.tabBtn, activeTab === "all" && styles.activeTab]}
        >
          <Text
            style={
              activeTab === "all" ? styles.activeText : styles.inactiveText
            }
          >
            {s.allPosts}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("following")}
          style={[
            styles.tabBtn,
            activeTab === "following" && [styles.activeTab, { elevation: 4 }],
          ]}
        >
          <Text
            style={
              activeTab === "following"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            {s.following}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      {/* <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      /> */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostCard {...item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.light.foreground,
  },
  icons: {
    flexDirection: "row",
    gap: 12,
  },

  /* TABS */
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.light.muted,
    margin: 12,
    borderRadius: 10,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    elevation: 4,
    backgroundColor: colors.light.card,
  },
  activeText: {
    color: colors.light.foreground,
    fontWeight: "600",
  },
  inactiveText: {
    color: colors.light.mutedText,
  },
});
