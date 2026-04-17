import { STRINGS } from "@/constant/string";
import { colors } from "@/theme/colors";
import { Comment } from "@/types/comment";
import { Image, StyleSheet, Text, View } from "react-native";

const renderCommentItem = (comment: Comment) => {
  const s = STRINGS.comments;
  return (
    <View style={styles.commentBox}>
      <View style={styles.commentRow}>
        <Image source={{ uri: comment.owner.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.rowTop}>
            <Text style={styles.name}>{comment.owner.username}</Text>
            <Text style={styles.time}>{comment.createdAt}</Text>
          </View>
          <Text style={styles.text}>{comment.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default renderCommentItem;

const styles = StyleSheet.create({
  /* COMMENT */
  commentBox: {
    borderBottomWidth: 1,
    borderColor: colors.light.border,
    padding: 16,
  },

  commentRow: {
    flexDirection: "row",
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

  text: {
    marginVertical: 4,
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
});
