import { Image, StyleSheet } from "react-native";
import airbnbLogo from "./../assets/img/Airbnb-Logo-No-Text.webp";

const Logo = ({
  size,
  isCentered,
}: {
  size?: number;
  isCentered?: boolean;
}) => {
  const styles = useStyle(size, isCentered);
  return <Image source={airbnbLogo} style={styles.logo} resizeMode="cover" />;
};

export default Logo;

const useStyle = (size?: number, isCentered?: boolean) => {
  const styles = StyleSheet.create({
    logo: {
      height: size ? size : 70,
      width: size ? size : 70,
      alignSelf: isCentered ? "center" : "auto",
    },
  });
  return styles;
};
