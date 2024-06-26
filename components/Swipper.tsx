import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import Swip from "react-native-swiper";
import { IPicture } from "../interfaces/Room";
import RoomImage from "./RoomImage";

const Swiper = ({
  imgList,
  price,
  relativeWidthSize,
  autoplay,
}: {
  imgList: Array<IPicture>;
  price: number;
  relativeWidthSize: number;
  autoplay?: boolean;
}) => {
  const styles = useStyle(relativeWidthSize);
  return (
    <Swip
      autoplay={autoplay ? true : false}
      style={styles.wrapper}
      showsButtons={false}
    >
      {imgList.map((img) => {
        return (
          <View key={img.picture_id} style={styles.slide}>
            <RoomImage
              price={price}
              relativeWidthSize={relativeWidthSize}
              isCentered
              source={{ uri: img.url }}
            />
          </View>
        );
      })}
    </Swip>
  );
};

const useStyle = (relativeWidthSize: number) => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    wrapper: {
      height: relativeWidthSize * width * 0.53,
    },
    slide: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return styles;
};

export default Swiper;
