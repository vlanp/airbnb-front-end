import { View, StyleSheet } from "react-native";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EMainTab from "../enum/MainTab";

const MainTabIcons = ({
  color,
  mainTab,
}: {
  color: string;
  mainTab: EMainTab;
}) => {
  const styles = useStyle();
  return (
    <View style={styles.icon}>
      {mainTab === EMainTab.AROUND_ME ? (
        <FontAwesome name="map-marker" size={20} color={color} />
      ) : mainTab === EMainTab.HOME ? (
        <FontAwesome6 name="house-chimney" size={20} color={color} />
      ) : (
        <MaterialCommunityIcons name="account" size={20} color={color} />
      )}
    </View>
  );
};

const useStyle = () => {
  const styles = StyleSheet.create({
    icon: {
      justifyContent: "center",
    },
  });
  return styles;
};

export default MainTabIcons;
