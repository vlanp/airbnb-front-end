import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import Constants from "expo-constants";
import RoomDisplay from "../../components/RoomDisplay";
import { useEffect, useState } from "react";
import IRoom from "../../interfaces/Room";
import axios from "axios";
import { EErrorEnglish } from "../../enum/Error";
import Logo from "../../components/Logo";
import colors from "../../styles/colors";

const Home = () => {
  const [data, setData] = useState<Array<IRoom>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms";
        const response = await axios.get<Array<IRoom>>(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Unexpected response from back-end");
        setErrorMessage(EErrorEnglish.UNKNOWN_LOAD_ERROR);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  /**
   * @todo Create a error component
   */
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
        <View style={styles.headerLine} />
        <FlatList
          contentContainerStyle={styles.containerFlatList}
          data={data}
          keyExtractor={(room) => room._id}
          renderItem={({ item }) => (
            <RoomDisplay
              imgRelativeWidthSize={0.9}
              numberOfReviews={item.reviews}
              price={item.price}
              rating={item.ratingValue}
              roomImgUrl={item.photos[0].url}
              userImgUrl={item.user.account.photo.url}
              title={item.title}
              id={item._id}
              isBorderBottom
            />
          )}
        />
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    gap: 10,
  },
  headerLine: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  containerFlatList: {
    rowGap: 20,
  },
});

export default Home;
