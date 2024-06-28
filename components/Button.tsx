import { Pressable, StyleSheet } from "react-native";
import GreyText from "./GreyText";
import colors from "../styles/colors";

const Button = ({
  text,
  onPress,
  isDisabled,
  backgroundColor,
}: {
  text: string;
  onPress?: () => void;
  isDisabled?: boolean;
  backgroundColor?: string;
}) => {
  const styles = useStyle(isDisabled, backgroundColor);

  return (
    <Pressable style={styles.button} onPress={onPress} disabled={isDisabled}>
      <GreyText size={20} isCentered isBold>
        {text}
      </GreyText>
    </Pressable>
  );
};

const useStyle = (isDisabled?: boolean, backgroundColor?: string) => {
  const styles = StyleSheet.create({
    button: {
      borderColor: isDisabled ? colors.grey : colors.red,
      borderWidth: 3,
      paddingVertical: 15,
      width: 200,
      borderRadius: 30,
      alignSelf: "center",
      backgroundColor: backgroundColor && backgroundColor,
    },
  });
  return styles;
};

export default Button;
