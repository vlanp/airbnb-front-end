import { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import emptyProfilePicture from "../../assets/img/empty-profile-picture.png";
import Input from "../../components/Input";
import EInputType from "../../enum/InputType";
import Button from "../../components/Button";
import axios, { AxiosResponse } from "axios";
import { IUpdateUser, IUser } from "../../interfaces/Sign";
import { EErrorEnglish } from "../../enum/Error";
import LottieLoading from "../../components/LottieLoading";
import EMainTab from "../../enum/MainTab";
import LottieError from "../../components/LottieError";
import * as ImagePicker from "expo-image-picker";

const MyProfile = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pictureUri, setPictureUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [mediaLibraryError, setMediaLibraryError] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const getLibraryImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });

      if (!result.canceled) {
        setPictureUri(result.assets[0].uri);
      }
    } else {
      setMediaLibraryError(true);
      alert(EErrorEnglish.MISSING_PERMISSIONS);
    }
  };

  const getCameraImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setPictureUri(result.assets[0].uri);
      }
    } else {
      setCameraError(true);
      alert(EErrorEnglish.MISSING_PERMISSIONS);
    }
  };

  const handleSubmit = async () => {
    setIsUpdateDisabled(true);
    try {
      if (description.length === 0) {
        throw new Error("Please describe yourself");
      }
      if (username.length === 0) {
        throw new Error("Please enter an username");
      }
      if (email.length === 0) {
        throw new Error("Please enter an email");
      }
      const headers = {
        Authorization: "Bearer " + authContext?.auth?.token,
      };
      const url1 =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update";
      const body = {
        email,
        description,
        username,
      };
      const response1Promise = axios.put<IUpdateUser>(url1, body, { headers });

      const arrayOfPromises: Array<
        Promise<AxiosResponse<IUpdateUser, unknown>>
      > = [];

      arrayOfPromises.push(response1Promise);

      if (pictureUri) {
        const url2 =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture";
        const formData = new FormData();
        const extension = pictureUri.split(".").pop();
        formData.append("photo", {
          uri: pictureUri,
          name: "my-pic." + extension,
          type: "image/" + extension,
        });
        const headers2 = {
          Authorization: "Bearer " + authContext?.auth?.token,
          "Content-Type": "multipart/form-data",
        };
        const response2Promise = axios.put<IUpdateUser>(url2, formData, {
          headers: headers2,
        });
        arrayOfPromises.push(response2Promise);
      }

      const responseList = await Promise.all(arrayOfPromises);
      const finalResponse = responseList[responseList.length - 1];
      setUsername(finalResponse.data.username);
      setEmail(finalResponse.data.email);
      setDescription(finalResponse.data.description);
      finalResponse.data.photo && setPictureUri(finalResponse.data.photo.url);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if ("error" in error.response.data) {
            setErrorMessage(error.response.data.error);
          } else {
            console.log("Back-end response lack the error.");
            setErrorMessage(EErrorEnglish.UNKNOWN_SIGN_ERROR);
          }
        } else if (error.request) {
          console.log(
            "No response received. Back-end is down, or back-end is misconfigurated, or there is a front end / back end network error."
          );
          setErrorMessage(EErrorEnglish.UNKNOWN_SIGN_ERROR);
        } else {
          console.log(
            "An error occured during the setting up of the request. Must be corrected."
          );
          setErrorMessage(EErrorEnglish.UNKNOWN_SIGN_ERROR);
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(EErrorEnglish.UNKNOWN_SIGN_ERROR);
      }
    }
    setIsUpdateDisabled(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" +
          authContext?.auth?.id;
        const headers = {
          Authorization: "Bearer " + authContext?.auth?.token,
        };
        const response = await axios.get<IUser>(url, { headers });
        setEmail(response.data.email);
        setDescription(response.data.description);
        setUsername(response.data.username);
        response.data.photo && setPictureUri(response.data.photo.url);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(EErrorEnglish.UNKNOWN_LOAD_ERROR);
      }
    };
    fetchData();
  }, [authContext]);

  return isLoading ? (
    <LottieLoading mainTab={EMainTab.MY_PROFILE} />
  ) : errorMessage ? (
    <LottieError errorMessage={errorMessage} />
  ) : (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.pictureView}>
        <Image
          source={pictureUri ? { uri: pictureUri } : emptyProfilePicture}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.iconsView}>
          <MaterialIcons
            style={styles.icon}
            name="photo-library"
            size={30}
            color="black"
            onPress={getLibraryImage}
          />
          <MaterialIcons
            style={styles.icon}
            name="photo-camera"
            size={30}
            color="black"
            onPress={getCameraImage}
          />
        </View>
      </View>
      <View style={styles.viewGap}>
        <Input
          inputType={EInputType.EMAIL}
          inputValue={email}
          placeholder=""
          setInputValue={setEmail}
        />
        <Input
          inputType={EInputType.TEXT}
          inputValue={username}
          placeholder=""
          setInputValue={setUsername}
        />
        <Input
          inputType={EInputType.TEXTAREA}
          inputValue={description}
          placeholder=""
          setInputValue={setDescription}
        />
      </View>
      <View style={styles.viewGap}>
        <Button
          text="Update"
          onPress={handleSubmit}
          isDisabled={isUpdateDisabled}
        />
        <Button
          text="Log out"
          onPress={authContext?.removeAuth}
          backgroundColor={colors.lightGrey}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  img: {
    width: 150,
    height: 150,
    borderColor: colors.lightRed,
    borderWidth: 2,
    borderRadius: 100,
  },
  icon: {
    color: colors.grey,
  },
  pictureView: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  iconsView: {
    justifyContent: "space-evenly",
  },
  viewGap: {
    gap: 20,
  },
});

export default MyProfile;
