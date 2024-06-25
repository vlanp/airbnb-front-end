import { Link as ExpoLink } from "expo-router";
import { StyleSheet } from "react-native";
import GreyText from "./GreyText";

const Link = ({
  href,
  redirectionText,
  isCentered,
  size,
}: {
  href: string;
  redirectionText: string;
  isCentered?: boolean;
  size?: number;
}) => {
  const styles = useStyle(isCentered);

  return (
    <ExpoLink href={href} style={styles.expoLink}>
      <GreyText size={size}>{redirectionText}</GreyText>
    </ExpoLink>
  );
};

const useStyle = (isCentered?: boolean) => {
  const styles = StyleSheet.create({
    expoLink: {
      textAlign: isCentered ? "center" : "auto",
    },
  });
  return styles;
};

export default Link;
