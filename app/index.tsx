import { View, Text } from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import EInputType from "../enum/InputType";
import SignForm from "../components/SignForm";
import ESign from "../enum/Sign";
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
