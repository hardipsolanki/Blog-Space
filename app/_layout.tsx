import { ROUTES } from "@/constant/appRoutes";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name={ROUTES.Index} options={{ headerShown: false }} />
          <Stack.Screen name={ROUTES.Tabs} options={{ headerShown: false }} />
          <Stack.Screen
            name={ROUTES.PostDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.followers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.followings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.comments}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={ROUTES.Login} options={{ headerShown: false }} />
          <Stack.Screen name={ROUTES.Signup} options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}
