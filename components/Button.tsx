import { Pressable, StyleSheet } from "react-native";
import GreyText from "./GreyText";
import colors from "../styles/colors";

const Button = ({
  text,
  onPress,
  isDisabled,
}: {
  text: string;
  onPress?: () => void;
  isDisabled?: boolean;
}) => {
  const styles = useStyle(isDisabled);

  return (
    <Pressable style={styles.button} onPress={onPress} disabled={isDisabled}>
      <GreyText size={20} isCentered isBold>
        {text}
      </GreyText>
    </Pressable>
  );
};

const useStyle = (isDisabled?: boolean) => {
  const styles = StyleSheet.create({
    button: {
      borderColor: isDisabled ? colors.grey : colors.red,
      borderWidth: 3,
      paddingVertical: 15,
      width: 200,
      borderRadius: 30,
      alignSelf: "center",
    },
  });
  return styles;
};

export default Button;
