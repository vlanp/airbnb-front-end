import { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const MyProfile = () => {
  const authContext = useContext(AuthContext);
  return (
    <View>
      <Text>Bienvenue sur myProfile !</Text>
      <Pressable
        onPress={() => {
          authContext?.removeAuth();
        }}
      >
        <Text>Deconnect from account</Text>
      </Pressable>
    </View>
  );
};

export default MyProfile;
