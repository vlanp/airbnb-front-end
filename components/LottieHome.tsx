import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import lottieHome from "./../assets/lottie/lottie-home.json";

const LottieHome = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
        }}
        source={lottieHome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default LottieHome;
