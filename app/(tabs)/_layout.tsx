import { ROUTES, TABS_PATHS } from "@/constant/appRoutes";
import { useAppSelector } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // optional: better spacing
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name={ROUTES.Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.AddPost}
        options={{
          title: "Add Post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          href: {
            pathname: TABS_PATHS.UserProfile,
            params: {
              username: userData?.username || "",
              userId: userData?._id,
            },
          },
        }}
      />
    </Tabs>
  );
}
