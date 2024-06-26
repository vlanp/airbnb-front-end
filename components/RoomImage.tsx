import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";

const RoomImage = ({
  source,
  price,
  relativeWidthSize,
  isCentered,
}: {
  source: ImageSourcePropType;
  price: number;
  relativeWidthSize: number;
  isCentered?: boolean;
}) => {
  const styles = useStyle(relativeWidthSize, isCentered);
  return (
    <View style={styles.view}>
      <Image source={source} style={styles.image} resizeMode="cover" />
      <View style={styles.textView}>
        <Text style={styles.text}>{price.toString() + " €"}</Text>
      </View>
    </View>
  );
};

const useStyle = (relativeWidthSize: number, isCentered?: boolean) => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    view: {
      position: "relative",
      width: relativeWidthSize * width,
      alignSelf: isCentered ? "center" : "auto",
    },
    image: {
      width: relativeWidthSize * width,
      height: relativeWidthSize * width * 0.53,
    },
    textView: {
      position: "absolute",
      height: 0.25 * relativeWidthSize * width * 0.53,
      width: 0.25 * relativeWidthSize * width,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      top: 0.7 * relativeWidthSize * width * 0.53,
    },
    text: {
      fontSize: 0.4 * 0.25 * relativeWidthSize * width * 0.53,
      color: "white",
    },
  });
  return styles;
};

export default RoomImage;
