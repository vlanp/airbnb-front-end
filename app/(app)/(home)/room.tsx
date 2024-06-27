import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import IRoom from "../../../interfaces/Room";
import axios from "axios";
import { EErrorEnglish } from "../../../enum/Error";
import RoomDisplay from "../../../components/RoomDisplay";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../styles/colors";
import LottieLoading from "../../../components/LottieLoading";
import LottieError from "../../../components/LottieError";
import Map from "../../../components/Map";
import EMainTab from "../../../enum/MainTab";

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
    <LottieLoading mainTab={EMainTab.HOME} />
  ) : errorMessage ? (
    <LottieError errorMessage={errorMessage} />
  ) : (
    data && (
      <ScrollView>
        <RoomDisplay
          id={data._id}
          imgRelativeWidthSize={1}
          numberOfReviews={data.reviews}
          price={data.price}
          rating={data.ratingValue}
          roomImg={data.photos}
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
        <View style={styles.mapView}>
          <Map
            markers={[
              {
                description: data.description,
                id: data._id,
                latitude: data.location[1],
                longitude: data.location[0],
                title: data.title,
              },
            ]}
            coordinates={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  mapView: {
    height: 250,
  },
});

export default Room;
