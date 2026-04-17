import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

const SkeletonBox = ({ width, height, style }: any) => (
  <LinearGradient
    colors={["#eee", "#ddd", "#eee"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[{ width, height, borderRadius: 6 }, style]}
  />
);

export const SkeletonCommentScreen = () => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <SkeletonBox width={24} height={24} />
        <SkeletonBox width={140} height={18} />
        <SkeletonBox width={24} height={24} />
      </View>

      {/* COMMENT LIST */}
      {[1, 2, 3, 4].map((_, i) => (
        <View key={i} style={styles.commentBox}>
          <View style={styles.commentRow}>
            <SkeletonBox width={40} height={40} style={{ borderRadius: 20 }} />

            <View style={{ flex: 1, gap: 6 }}>
              <View style={styles.rowTop}>
                <SkeletonBox width="40%" height={14} />
                <SkeletonBox width={60} height={12} />
              </View>

              <SkeletonBox width="90%" height={14} />
              <SkeletonBox width="70%" height={14} />
            </View>
          </View>
        </View>
      ))}

      {/* INPUT BAR */}
      <View style={styles.inputContainer}>
        <SkeletonBox width={36} height={36} style={{ borderRadius: 18 }} />

        <View style={styles.inputBox}>
          <SkeletonBox width="80%" height={16} />
          <SkeletonBox width={30} height={30} style={{ borderRadius: 15 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },

  /* COMMENT */
  commentBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  commentRow: {
    flexDirection: "row",
    gap: 10,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  /* INPUT */
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
