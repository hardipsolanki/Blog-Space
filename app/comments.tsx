import renderCommentItem from "@/components/CommentBox";
import { STRINGS } from "@/constant/string";
import { mockComments } from "@/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { colors } from "../theme/colors";

const CommentsScreen = () => {
  const router = useRouter();
  const s = STRINGS.comments;

  const [commentText, setCommentText] = useState("");

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
            {s.title} ({mockComments.length})
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* LIST */}
        <FlatList
          data={mockComments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommentItem}
          contentContainerStyle={{ paddingBottom: 90 }}
        />

        {/* INPUT BAR */}
        <View style={styles.inputContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            }}
            style={styles.myAvatar}
          />

          <View style={styles.inputBox}>
            <TextInput
              placeholder={s.placeholder}
              value={commentText}
              onChangeText={setCommentText}
              style={{ flex: 1 }}
            />

            <TouchableOpacity
              disabled={!commentText.trim()}
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
