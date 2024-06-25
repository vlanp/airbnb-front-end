import { Pressable, StyleSheet } from "react-native";
import GreyText from "./GreyText";
import colors from "../styles/colors";

const Button = ({ text }: { text: string }) => {
  const styles = useStyle();

  return (
    <Pressable style={styles.button}>
      <GreyText size={20} isCentered isBold>
        {text}
      </GreyText>
    </Pressable>
  );
};

const useStyle = () => {
  const styles = StyleSheet.create({
    button: {
      borderColor: colors.red,
      borderWidth: 3,
      paddingVertical: 15,
      width: 200,
      borderRadius: "50%",
      alignSelf: "center",
    },
  });
  return styles;
};

export default Button;
