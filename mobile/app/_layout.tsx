import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F8FAFC",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#0F172A",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Kalküla",
            headerLargeTitle: true,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
