import { Stack } from "expo-router";
import Logo from "../../../components/Logo";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="room"
        options={{
          headerTitle: () => <Logo size={30} isCentered />,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
