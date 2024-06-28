import { useContext, useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import emptyProfilePicture from "../../assets/img/empty-profile-picture.png";
import Input from "../../components/Input";
import EInputType from "../../enum/InputType";
import Button from "../../components/Button";

const MyProfile = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pictureUri, setPictureUri] = useState<string>("");

  const authContext = useContext(AuthContext);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.pictureView}>
        <Image
          source={emptyProfilePicture}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.iconsView}>
          <MaterialIcons
            style={styles.icon}
            name="photo-library"
            size={30}
            color="black"
          />
          <MaterialIcons
            style={styles.icon}
            name="photo-camera"
            size={30}
            color="black"
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
        <Button text="Update" />
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
