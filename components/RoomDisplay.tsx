import { View, Text, Image, StyleSheet } from "react-native";
import RoomImage from "./RoomImage";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import colors from "../styles/colors";
import GreyText from "./GreyText";
import { Link } from "expo-router";
import { IPicture } from "../interfaces/Room";
import Swiper from "./Swipper";

const RoomDisplay = ({
  imgRelativeWidthSize,
  roomImg,
  userImgUrl,
  price,
  rating,
  numberOfReviews,
  title,
  id,
  isBorderBottom,
  autoplay,
}: {
  imgRelativeWidthSize: number;
  roomImg: IPicture | Array<IPicture>;
  userImgUrl: string;
  price: number;
  rating: number;
  numberOfReviews: number;
  title: string;
  id: string;
  isBorderBottom?: boolean;
  autoplay?: boolean;
}) => {
  const styles = useStyle(isBorderBottom);
  return (
    <View style={styles.main}>
      <Link
        style={styles.link}
        href={{ pathname: "/room", params: { id } }}
      ></Link>
      {Array.isArray(roomImg) ? (
        <Swiper
          imgList={roomImg}
          price={price}
          relativeWidthSize={imgRelativeWidthSize}
          autoplay={autoplay}
        />
      ) : (
        <RoomImage
          isCentered
          price={price}
          relativeWidthSize={imgRelativeWidthSize}
          source={{
            uri: roomImg.url,
          }}
        />
      )}
      <View style={styles.section1}>
        <View style={styles.description}>
          <Text numberOfLines={1} style={styles.h3}>
            {title}
          </Text>
          <View style={styles.rating}>
            <StarRatingDisplay
              starStyle={styles.starRating}
              rating={rating}
              starSize={20}
              color={colors.yellow}
              emptyColor={colors.emptyGrey}
            />
            <GreyText size={14}>{numberOfReviews} reviews</GreyText>
          </View>
        </View>
        <Image
          resizeMode="cover"
          source={{ uri: userImgUrl }}
          style={styles.userImg}
        />
      </View>
    </View>
  );
};

const useStyle = (isBorderBottom?: boolean) => {
  const styles = StyleSheet.create({
    main: {
      position: "relative",
      gap: 10,
    },
    section1: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%",
      alignSelf: "center",
      paddingBottom: 10,
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: isBorderBottom ? 1 : 0,
    },
    description: {
      width: "75%",
    },
    rating: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    starRating: {
      marginHorizontal: 0,
    },
    userImg: {
      width: 70,
      height: 70,
      borderRadius: 50,
    },
    h3: {
      fontSize: 20,
      paddingVertical: 10,
    },
    link: {
      top: 0,
      left: "5%",
      position: "absolute",
      height: "100%",
      width: "90%",
      zIndex: 1,
    },
  });
  return styles;
};

export default RoomDisplay;
