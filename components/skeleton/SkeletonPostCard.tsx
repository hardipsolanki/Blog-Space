// components/SkeletonPostCard.tsx
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

export const SkeletonPostCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} style={{ borderRadius: 20 }} />
        <View style={{ flex: 1, gap: 6 }}>
          <SkeletonBox width="60%" height={16} />
          <SkeletonBox width="40%" height={12} />
        </View>
      </View>

      <SkeletonBox width="80%" height={20} style={{ marginBottom: 8 }} />
      <SkeletonBox width="100%" height={14} style={{ marginBottom: 6 }} />
      <SkeletonBox width="70%" height={14} style={{ marginBottom: 12 }} />

      <SkeletonBox width="100%" height={180} style={{ borderRadius: 12 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});
