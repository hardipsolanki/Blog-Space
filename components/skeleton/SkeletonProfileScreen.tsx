import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;

const SkeletonBox = ({ width, height, style }: any) => (
  <LinearGradient
    colors={["#eee", "#ddd", "#eee"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[{ width, height, borderRadius: 6 }, style]}
  />
);

export const SkeletonProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SkeletonBox width={24} height={24} />
        <SkeletonBox width={120} height={18} />
        <SkeletonBox width={24} height={24} />
      </View>

      {/* Cover */}
      <SkeletonBox width="100%" height={150} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <SkeletonBox width={100} height={100} style={styles.avatar} />

        <SkeletonBox width="50%" height={20} style={{ marginBottom: 6 }} />
        <SkeletonBox width="40%" height={14} style={{ marginBottom: 10 }} />

        {/* Stats */}
        <View style={styles.stats}>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={{ alignItems: "center" }}>
              <SkeletonBox width={40} height={16} />
              <SkeletonBox width={60} height={12} style={{ marginTop: 4 }} />
            </View>
          ))}
        </View>

        {/* Button */}
        <SkeletonBox width="100%" height={40} style={{ borderRadius: 10 }} />
      </View>

      {/* Tab */}
      <View style={styles.tab}>
        <SkeletonBox width={80} height={16} />
        <SkeletonBox width={60} height={2} style={{ marginTop: 6 }} />
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {[1, 2, 3, 4].map((_, i) => (
          <SkeletonBox
            key={i}
            width={screenWidth / 2 - 4}
            height={screenWidth / 2 - 4}
            style={{ margin: 2, borderRadius: 8 }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },

  profileSection: {
    padding: 16,
    marginTop: -50,
  },

  avatar: {
    borderRadius: 50,
    marginBottom: 10,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },

  tab: {
    alignItems: "center",
    paddingVertical: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
