import { ROUTER_PATHS } from "@/constant/appRoutes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

export const PostCard = ({ post }: any) => {
  const router = useRouter();
  const [showLikes, setShowLikes] = useState(false);
  return (
    <Link
      href={{
        pathname: ROUTER_PATHS.PostDetails as any,
        params: { postId: post.id },
      }}
    >
      <View style={styles.container}>
        {/* Author */}
        <View style={styles.header}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{post.author.fullName}</Text>
            <Text style={styles.username}>
              @{post.author.username} · {post.timestamp}
            </Text>
          </View>
        </View>

        {/* Content */}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.excerpt}>{post.excerpt}</Text>

        {/* Image */}
        {post.coverImage && (
          <Image source={{ uri: post.coverImage }} style={styles.cover} />
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.row}>
            <View style={styles.actionBtn}>
              {/* LIKE BUTTON */}
              <TouchableOpacity
                style={styles.likeRow}
                onPress={() => {
                  // handle like toggle here
                }}
              >
                <Ionicons
                  name={post.isLiked ? "heart" : "heart-outline"}
                  size={20}
                  color={post.isLiked ? "red" : colors.light.mutedText}
                />
              </TouchableOpacity>

              {/* LIKE COUNT (OPEN SHEET) */}
              <TouchableOpacity onPress={() => setShowLikes(true)}>
                <Text>{post.likes}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push(ROUTER_PATHS.comments)}
            >
              <Ionicons name="chatbubble-outline" size={20} />
              <Text>{post.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.light.border,
    backgroundColor: colors.light.card,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: "600",
    color: colors.light.foreground,
  },
  username: {
    fontSize: 12,
    color: colors.light.mutedText,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: colors.light.foreground,
  },
  excerpt: {
    color: colors.light.mutedText,
    marginBottom: 10,
  },
  cover: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  actionBtn: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  likeRow: {
    flexDirection: "row",
  },
});
