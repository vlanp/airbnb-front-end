import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import IRoom from "../../interfaces/Room";
import axios from "axios";
import { EErrorEnglish } from "../../enum/Error";
import RoomDisplay from "../../components/RoomDisplay";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import Logo from "../../components/Logo";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../styles/colors";

const Room = () => {
  const [data, setData] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (typeof id !== "string") {
      router.navigate("/home");
      return;
    }
    const fetchData = async () => {
      try {
        const url =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" +
          id;
        const response = await axios.get<IRoom>(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(EErrorEnglish.UNKNOWN_LOAD_ERROR);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <ActivityIndicator />
  ) : errorMessage ? (
    <View>
      <Text>{errorMessage}</Text>
    </View>
  ) : (
    data && (
      <SafeAreaView style={styles.safeAreaView}>
        <Logo size={30} isCentered />
        <ScrollView>
          <RoomDisplay
            id={data._id}
            imgRelativeWidthSize={1}
            numberOfReviews={data.reviews}
            price={data.price}
            rating={data.ratingValue}
            roomImgUrl={data.photos[0].url}
            title={data.title}
            userImgUrl={data.user.account.photo.url}
          />
          <View>
            <Text
              style={styles.descriptionView}
              numberOfLines={showMore ? undefined : 3}
            >
              {data.description}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setShowMore(!showMore);
            }}
            style={styles.pressable}
          >
            <Text style={styles.carret}>
              {showMore ? "Show less" : "Show more"}
            </Text>
            <AntDesign
              style={styles.carret}
              name={showMore ? "caretup" : "caretdown"}
              color="black"
            />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    gap: 10,
  },
  descriptionView: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  carret: {
    color: colors.grey,
    fontSize: 14,
  },
  pressable: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default Room;
