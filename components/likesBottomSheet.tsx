// import React, { useEffect, useMemo, useRef } from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import { STRINGS } from "@/constant/string";
// import { mockPosts, mockUsers } from "@/data";
// import { colors } from "../theme/colors";

// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

// const LikesBottomSheet = ({ visible, onClose }: any) => {
//   const s = STRINGS.likes;
//   const sheetRef = useRef<BottomSheet>(null);

//   const snapPoints = useMemo(() => ["60%", "85%"], []);
//   const post = mockPosts[0];

//   // control open/close
//   useEffect(() => {
//     if (visible) {
//       sheetRef.current?.expand();
//     } else {
//       sheetRef.current?.close();
//     }
//   }, [visible]);

//   return (
//     <BottomSheet
//       ref={sheetRef}
//       index={-1}
//       snapPoints={snapPoints}
//       enablePanDownToClose
//       onClose={onClose}
//       backgroundStyle={{ backgroundColor: colors.light.card }}
//       handleIndicatorStyle={{ backgroundColor: "#ccc" }}
//     >
//       <BottomSheetView>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.title}>{s.title}</Text>
//           <Text style={styles.subtitle}>
//             <Text style={{ fontWeight: "600", color: colors.light.foreground }}>
//               {post.likes}
//             </Text>{" "}
//             {s.peopleLiked}
//           </Text>
//         </View>

//         {/* Users */}
//         <View style={styles.list}>
//           {mockUsers.map((user) => (
//             <View key={user.id} style={styles.row}>
//               {/* Left */}
//               <View style={styles.userInfo}>
//                 <Image source={{ uri: user.avatar }} style={styles.avatar} />
//                 <View>
//                   <Text style={styles.name}>{user.fullName}</Text>
//                   <Text style={styles.username}>@{user.username}</Text>
//                 </View>
//               </View>

//               {/* Follow Button */}
//               <TouchableOpacity
//                 style={[
//                   styles.followBtn,
//                   user.isFollowing && styles.followingBtn,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.followText,
//                     user.isFollowing && styles.followingText,
//                   ]}
//                 >
//                   {user.isFollowing ? s.following : s.follow}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       </BottomSheetView>
//     </BottomSheet>
//   );
// };

// export default LikesBottomSheet;

// const styles = StyleSheet.create({
//   header: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderColor: colors.light.border,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: colors.light.foreground,
//   },
//   subtitle: {
//     marginTop: 4,
//     color: colors.light.mutedText,
//   },

//   list: {
//     padding: 12,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//   },

//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 22,
//   },

//   name: {
//     fontWeight: "600",
//     color: colors.light.foreground,
//   },

//   username: {
//     fontSize: 12,
//     color: colors.light.mutedText,
//   },

//   followBtn: {
//     backgroundColor: colors.light.primary,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },

//   followingBtn: {
//     backgroundColor: colors.light.secondary,
//     borderWidth: 1,
//     borderColor: colors.light.border,
//   },

//   followText: {
//     color: "#fff",
//     fontWeight: "600",
//   },

//   followingText: {
//     color: colors.light.foreground,
//   },
// });

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default App;
