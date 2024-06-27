import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import lottieHome from "./../assets/lottie/lottie-home-loading.json";
import lottieAround from "./../assets/lottie/lottie-around-loading.json";
import EMainTab from "../enum/MainTab";

const LottieHome = ({ mainTab }: { mainTab: EMainTab }) => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
        }}
        source={mainTab === EMainTab.HOME ? lottieHome : lottieAround}
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
