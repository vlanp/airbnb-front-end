import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="room"
        options={{
          headerTransparent: true,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
