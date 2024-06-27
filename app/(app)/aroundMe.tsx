import * as Location from "expo-location";
import { ICoordinates } from "../../interfaces/Markers";
import { useEffect, useState } from "react";
import { EErrorEnglish } from "../../enum/Error";
import axios from "axios";
import { IAroundRoom } from "../../interfaces/Room";
import LottieLoading from "../../components/LottieLoading";
import EMainTab from "../../enum/MainTab";
import LottieError from "../../components/LottieError";
import Map from "../../components/Map";

const AroundMe = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<ICoordinates>();
  const [data, setData] = useState<Array<IAroundRoom>>();

  const defaultCoordinates = {
    latitude: 48.856614,
    longitude: 2.3522219,
  };

  useEffect(() => {
    const fetchData = async () => {
      let error = false;
      const askPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          error = true;
        }
      };
      try {
        await askPermission();
        if (error) {
          alert(EErrorEnglish.MISSING_PERMISSIONS);
        }
        const url =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=" +
          (coordinates?.latitude || defaultCoordinates.latitude) +
          "&longitude=" +
          (coordinates?.longitude || defaultCoordinates.longitude);
        const response = await axios.get<Array<IAroundRoom>>(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(EErrorEnglish.UNKNOWN_LOAD_ERROR);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <LottieLoading mainTab={EMainTab.AROUND_ME} />
  ) : errorMessage ? (
    <LottieError errorMessage={errorMessage} />
  ) : (
    data && (
      <Map
        coordinates={coordinates ? coordinates : defaultCoordinates}
        markers={data.map((room) => {
          return {
            description: room.description,
            id: room._id,
            latitude: room.location[1],
            longitude: room.location[0],
            title: room.title,
          };
        })}
      />
    )
  );
};

export default AroundMe;
