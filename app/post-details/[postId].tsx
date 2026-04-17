import { SkeletonPostCard } from "@/components/skeleton/SkeletonPostCard";
import { ROUTER_PATHS, TABS_PATHS } from "@/constant/appRoutes";
import { STRINGS } from "@/constant/string";
import { getSinglePost, likeDislikePost } from "@/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const PostDetailScreen = () => {
  const { postId } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { loading, signlePost, likeDislikeLoading } = useAppSelector(
    (state) => state.post,
  );

  useEffect(() => {
    if (!postId) return;
    dispatch(getSinglePost(postId as string));
  }, [postId, dispatch]);
  const router = useRouter();
  const s = STRINGS.postDetail;

  if (loading === "pending" || !signlePost) {
    return (
      <SafeAreaView style={styles.container}>
        <SkeletonPostCard />
      </SafeAreaView>
    );
  }

  const handleLikeToggle = () => {
    dispatch(likeDislikePost(signlePost?._id))
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
          text2: error.message || "Failed to register user",
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scroll Content */}
      <ScrollView>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri:
                signlePost?.image ||
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
            }}
            style={styles.cover}
          />

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{signlePost?.title}</Text>

          <View style={styles.authorRow}>
            {/* Author */}
            <Link
              href={{
                pathname: TABS_PATHS.UserProfile,
                params: {
                  username: signlePost.owner.username,
                  userId: signlePost.owner._id,
                },
              }}
            >
              <View style={styles.authorInfo}>
                <Image
                  source={{ uri: signlePost?.owner?.avatar }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.name}>{signlePost?.owner?.name}</Text>
                  <Text style={styles.username}>
                    @{signlePost?.owner?.username}
                  </Text>
                </View>
              </View>
            </Link>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>{s.follow}</Text>
            </TouchableOpacity>
          </View>

          {/* Meta */}
          <Text style={styles.meta}>{signlePost?.createdAt}</Text>

          {/* Article */}
          <Text style={styles.paragraph}>{signlePost?.content}</Text>
          {/* <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text style={styles.paragraph}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Text>
          <Text style={styles.paragraph}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </Text> */}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            disabled={likeDislikeLoading === "pending"}
            style={styles.actionBtn}
            onPress={handleLikeToggle}
          >
            <Ionicons
              name={signlePost.isLike ? "heart" : "heart-outline"}
              size={22}
              color={signlePost.isLike ? "red" : colors.light.foreground}
            />
            <Text>{signlePost.likesCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: ROUTER_PATHS.comments,
                params: { postId: signlePost._id },
              })
            }
            style={styles.actionBtn}
          >
            <Ionicons name="chatbubble-outline" size={22} />
            <Text>{signlePost?.commentsCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },

  /* COVER */
  coverContainer: {
    position: "relative",
  },
  cover: {
    width: "100%",
    height: 220,
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 16,
    backgroundColor: "#ffffffcc",
    padding: 8,
    borderRadius: 20,
  },

  /* CONTENT */
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: colors.light.foreground,
  },

  /* AUTHOR */
  authorRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  authorInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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

  followBtn: {
    backgroundColor: colors.light.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followText: {
    color: "#fff",
    fontWeight: "600",
  },

  meta: {
    color: colors.light.mutedText,
    marginBottom: 16,
  },

  paragraph: {
    marginBottom: 12,
    lineHeight: 22,
    color: colors.light.foreground,
  },

  /* BOTTOM BAR */
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderTopWidth: 1,
    borderColor: colors.light.border,
    backgroundColor: colors.light.card,
  },
  leftActions: {
    flexDirection: "row",
    gap: 16,
  },
  rightActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
