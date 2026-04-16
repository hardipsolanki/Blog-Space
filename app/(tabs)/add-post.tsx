import { AppButton } from "@/components/AppButton";
import { STRINGS } from "@/constant/string";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { TABS_PATHS } from "@/constant/appRoutes";
import { addPost, getPosts } from "@/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

type Input = {
  title: string;
  content: string;
  status: "active" | "inactive";
  image: ImageFile;
};

export default function AddPostScreen() {
  const router = useRouter();
  const s = STRINGS.addPost;
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(({ post }) => post);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [image, setImage] = useState<any>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      status: "active",
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required.");
      return;
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!response.canceled) {
      const asset = response.assets[0];

      // ✅ React Native needs uri, name, AND type exactly like this
      const file = {
        uri: asset.uri,
        name: asset.fileName || `image_${Date.now()}.jpg`, // use real name if available
        type: asset.mimeType || "image/jpeg", // use real mime type
      };

      setImage(file.uri);
      setValue("image", file);
    }
  };

  const onSubmit = (data: Input) => {
    if (!data.image) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select an image.",
      });
      return;
    }

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("post", data.image as any);

    dispatch(addPost(formData))
      .unwrap()
      .then((data) => {
        if (data) {
          dispatch(getPosts())
            .unwrap()
            .then((data) => {
              Toast.show({
                type: "success",
                text1: "Success",
                text2: data.message || "Post added successfully",
              });
              router.push(TABS_PATHS.Index);
            });
        }
      })
      .catch((error) => {
        console.log("error while add post: ", error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{s.title}</Text>

            <AppButton
              onPress={handleSubmit(onSubmit)}
              style={styles.publishBtn}
              title={s.publish}
              loading={loading === "pending"}
            />
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Title */}
            <Controller
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={s.postTitle}
                  placeholderTextColor={colors.light.mutedText}
                  style={styles.titleInput}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.title && (
              <Text style={{ color: "red" }}>{errors.title.message}</Text>
            )}

            {/* Content */}
            <Controller
              control={control}
              name="content"
              rules={{
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={s.content}
                  placeholderTextColor={colors.light.mutedText}
                  multiline
                  style={styles.contentInput}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.content && (
              <Text style={{ color: "red" }}>{errors.content.message}</Text>
            )}

            {/* Status */}
            <View>
              <Text style={styles.label}>{s.status}</Text>

              <View style={styles.statusRow}>
                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    status === "active" && styles.activeStatus,
                  ]}
                  onPress={() => {
                    setStatus("active");
                    setValue("status", "active"); // ✅ RHF sync
                  }}
                >
                  <Text
                    style={
                      status === "active"
                        ? styles.activeText
                        : styles.inactiveText
                    }
                  >
                    {s.active}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    status === "inactive" && styles.activeStatus,
                  ]}
                  onPress={() => {
                    setStatus("inactive");
                    setValue("status", "inactive"); // ✅ RHF sync
                  }}
                >
                  <Text
                    style={
                      status === "inactive"
                        ? styles.activeText
                        : styles.inactiveText
                    }
                  >
                    {s.inactive}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Image Upload */}
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <>
                  <Ionicons
                    name="image-outline"
                    size={30}
                    color={colors.light.mutedText}
                  />
                  <Text style={styles.uploadText}>{s.upload}</Text>
                  <Text style={styles.uploadDesc}>{s.uploadDesc}</Text>
                </>
              )}
            </TouchableOpacity>

            {/* optional image error */}
            {errors.image && (
              <Text style={{ color: "red" }}>Image is required</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

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
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.light.foreground,
  },

  /* FORM */
  form: {
    padding: 16,
    gap: 16,
  },

  titleInput: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.light.foreground,
    backgroundColor: colors.light.inputBg,
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  contentInput: {
    minHeight: 150,
    textAlignVertical: "top",
    color: colors.light.foreground,
    backgroundColor: colors.light.inputBg,
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  publishBtn: {
    padding: 10,
    borderRadius: 10,
  },

  label: {
    marginBottom: 8,
    color: colors.light.foreground,
  },

  /* STATUS */
  statusRow: {
    flexDirection: "row",
    gap: 10,
  },
  statusBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.light.muted,
    alignItems: "center",
  },
  activeStatus: {
    backgroundColor: colors.light.primary,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  inactiveText: {
    color: colors.light.mutedText,
  },
  /* IMAGE */
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.light.border,
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
  },
  uploadText: {
    marginTop: 8,
    fontWeight: "600",
    color: colors.light.foreground,
  },
  uploadDesc: {
    fontSize: 12,
    color: colors.light.mutedText,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
});
