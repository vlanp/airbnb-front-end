import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import lottieError from "./../assets/lottie/lottie-error.json";

const LottieError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
        }}
        source={lottieError}
      />
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "red",
    textAlign: "center",
    fontSize: 30,
    width: "80%",
    fontStyle: "italic",
    paddingVertical: 20,
  },
});

export default LottieError;
