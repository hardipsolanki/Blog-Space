import renderCommentItem from "@/components/CommentBox";
import { STRINGS } from "@/constant/string";
import { addComment, getComments } from "@/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { colors } from "../../theme/colors";

const CommentsScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user.userData);
  const { commentLoading, comments } = useAppSelector(({ post }) => post);
  const s = STRINGS.comments;
  const [commentText, setCommentText] = useState("");

  if (commentLoading === "pending" || !comments?.length || !user) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>;
  }

  useEffect(() => {
    if (!postId) return;
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if (!commentText) return;
    dispatch(addComment({ content: commentText, postId: postId }))
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message,
        });
        setCommentText("");
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>
            {s.title} ({comments?.length})
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* LIST */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderCommentItem(item)}
          contentContainerStyle={{ paddingBottom: 90 }}
        />

        {/* INPUT BAR */}
        <View style={styles.inputContainer}>
          <Image source={{ uri: user?.avatar }} style={styles.myAvatar} />

          <View style={styles.inputBox}>
            <TextInput
              placeholder={s.placeholder}
              value={commentText}
              onChangeText={setCommentText}
              style={{ flex: 1 }}
            />

            <TouchableOpacity
              onPress={handleAddComment}
              disabled={!commentText.trim() || commentLoading === "pending"}
              style={[styles.sendBtn, commentText.trim() && styles.sendActive]}
            >
              <Ionicons
                name="send"
                size={16}
                color={commentText.trim() ? "#fff" : "#999"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

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

  /* COMMON */
  rowTop: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  time: {
    fontSize: 12,
    color: colors.light.mutedText,
  },

  actions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 6,
    alignItems: "center",
  },

  likeRow: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  likeText: {
    fontSize: 12,
  },

  replyText: {
    fontSize: 12,
    color: colors.light.primary,
  },

  /* INPUT */
  inputContainer: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.light.border,
    backgroundColor: colors.light.card,
  },

  myAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },

  inputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light.secondary,
    borderRadius: 25,
    paddingHorizontal: 12,
  },

  sendBtn: {
    padding: 6,
    borderRadius: 20,
  },

  sendActive: {
    backgroundColor: colors.light.primary,
  },
});
