import { View } from "react-native";
import { router } from "expo-router";

export default function HomePage() {
  return (
    <View
      onLayout={() => {
        router.navigate("/login");
      }}
    ></View>
  );
}
