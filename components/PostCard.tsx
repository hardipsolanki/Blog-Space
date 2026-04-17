import { ROUTER_PATHS, TABS_PATHS } from "@/constant/appRoutes";
import { likeDislikePost } from "@/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Post } from "@/types/post";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors } from "../theme/colors";

export const PostCard = (post: Post) => {
  const dispatch = useAppDispatch();
  const { likeDislikeLoading } = useAppSelector((state) => state.post);

  const handleLikeToggle = () => {
    dispatch(likeDislikePost(post._id))
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
          text2: error.message || "Failed to like user",
        });
      });
  };

  const router = useRouter();
  const [showLikes, setShowLikes] = useState(false);
  return (
    <Link href={`/post-details/${post._id}`}>
      <View style={styles.container}>
        <Link
          href={{
            pathname: TABS_PATHS.UserProfile,
            params: { username: post.owner.username, userId: post.owner._id },
          }}
        >
          <View style={styles.header}>
            <Image source={{ uri: post.owner.avatar }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{post.owner.username}</Text>
              <Text style={styles.username}>
                @{post.owner.username} · {post.createdAt}
              </Text>
            </View>
          </View>
        </Link>

        {/* Content */}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.excerpt}>{post.content}</Text>

        {/* Image */}
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.cover} />
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.row}>
            <View style={styles.actionBtn}>
              {/* LIKE BUTTON */}
              <TouchableOpacity
                style={styles.likeRow}
                onPress={handleLikeToggle}
                disabled={likeDislikeLoading === "pending"}
              >
                <Ionicons
                  name={post.isLike ? "heart" : "heart-outline"}
                  size={20}
                  color={post.isLike ? "red" : colors.light.mutedText}
                />
              </TouchableOpacity>

              {/* LIKE COUNT (OPEN SHEET) */}
              <TouchableOpacity onPress={() => setShowLikes(true)}>
                <Text>{post.likesCount}</Text>
              </TouchableOpacity>
            </View>

            <Link
              href={{
                pathname: ROUTER_PATHS.comments,
                params: { postId: post._id },
              }}
            >
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  router.push({
                    pathname: ROUTER_PATHS.comments,
                    params: { postId: post._id },
                  })
                }
              >
                <Ionicons name="chatbubble-outline" size={20} />
                <Text>{post.commentsCount}</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

// import { ROUTER_PATHS } from "@/constant/appRoutes";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Link, useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { colors } from "../theme/colors";

// export const PostCard = ({ post }: any) => {
//   const router = useRouter();
//   const [showLikes, setShowLikes] = useState(false);
//   return (
//     <Link
//       href={{
//         pathname: ROUTER_PATHS.PostDetails as any,
//         params: { postId: post.id },
//       }}
//     >
//       <View style={styles.container}>
//         {/* Author */}
//         <View style={styles.header}>
//           <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

//           <View style={{ flex: 1 }}>
//             <Text style={styles.name}>{post.author.fullName}</Text>
//             <Text style={styles.username}>
//               @{post.author.username} · {post.timestamp}
//             </Text>
//           </View>
//         </View>

//         {/* Content */}
//         <Text style={styles.title}>{post.title}</Text>
//         <Text style={styles.excerpt}>{post.excerpt}</Text>

//         {/* Image */}
//         {post.coverImage && (
//           <Image source={{ uri: post.coverImage }} style={styles.cover} />
//         )}

//         {/* Actions */}
//         <View style={styles.actions}>
//           <View style={styles.row}>
//             <View style={styles.actionBtn}>
//               {/* LIKE BUTTON */}
//               <TouchableOpacity
//                 style={styles.likeRow}
//                 onPress={() => {
//                   // handle like toggle here
//                 }}
//               >
//                 <Ionicons
//                   name={post.isLiked ? "heart" : "heart-outline"}
//                   size={20}
//                   color={post.isLiked ? "red" : colors.light.mutedText}
//                 />
//               </TouchableOpacity>

//               {/* LIKE COUNT (OPEN SHEET) */}
//               <TouchableOpacity onPress={() => setShowLikes(true)}>
//                 <Text>{post.likes}</Text>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={() => router.push(ROUTER_PATHS.comments)}
//             >
//               <Ionicons name="chatbubble-outline" size={20} />
//               <Text>{post.comments}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Link>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderColor: colors.light.border,
//     backgroundColor: colors.light.card,
//   },
//   header: {
//     flexDirection: "row",
//     marginBottom: 10,
//     gap: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   name: {
//     fontWeight: "600",
//     color: colors.light.foreground,
//   },
//   username: {
//     fontSize: 12,
//     color: colors.light.mutedText,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 4,
//     color: colors.light.foreground,
//   },
//   excerpt: {
//     color: colors.light.mutedText,
//     marginBottom: 10,
//   },
//   cover: {
//     width: "100%",
//     height: 180,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   row: {
//     flexDirection: "row",
//     gap: 16,
//   },
//   actionBtn: {
//     flexDirection: "row",
//     gap: 4,
//     alignItems: "center",
//   },
//   likeRow: {
//     flexDirection: "row",
//   },
// });
