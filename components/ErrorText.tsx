import { Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

const ErrorText = ({
  children,
  size,
  isBold,
  isCentered,
}: {
  children: React.ReactNode;
  size?: number;
  isBold?: boolean;
  isCentered?: boolean;
}) => {
  const styles = useStyle(size, isBold, isCentered);
  return <Text style={styles.text}>{children}</Text>;
};

const useStyle = (size?: number, isBold?: boolean, isCentered?: boolean) => {
  const styles = StyleSheet.create({
    text: {
      color: colors.errorRed,
      fontSize: size || 16,
      fontWeight: isBold ? "bold" : 400,
      alignSelf: isCentered ? "center" : "auto",
    },
  });

  return styles;
};

export default ErrorText;
