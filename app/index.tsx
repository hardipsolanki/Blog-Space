import { ROUTER_PATHS, TABS_PATHS } from "@/constant/appRoutes";
import { crrentUser } from "@/features/users/userSlice";
import { useAppDispatch } from "@/store/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
          router.replace(ROUTER_PATHS.Login);
          return;
        }

        const result = await dispatch(crrentUser()).unwrap();

        if (result.data) {
          router.replace(TABS_PATHS.Index);
        } else {
          router.replace(ROUTER_PATHS.Login);
        }
      } catch (error) {
        console.log("Auth error:", error);

        await AsyncStorage.removeItem("accessToken");
        router.replace(ROUTER_PATHS.Login);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return null;
}
