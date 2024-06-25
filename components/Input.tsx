import { Dispatch, SetStateAction } from "react";
import {
  TextInput,
  StyleSheet,
  useWindowDimensions,
  KeyboardTypeOptions,
} from "react-native";
import colors from "../styles/colors";
import EInputType, { EKeyboardType } from "../enum/InputType";

const Input = ({
  placeholder,
  inputValue,
  setInputValue,
  inputType,
}: {
  placeholder: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  inputType: EInputType;
}) => {
  const styles = useStyle(inputType);

  let keyboardType: KeyboardTypeOptions;
  switch (inputType) {
    case EInputType.EMAIL:
      keyboardType = EKeyboardType.EMAIL;
      break;
    case EInputType.PASSWORD:
      keyboardType = EKeyboardType.DEFAULT;
      break;
    case EInputType.TEXT:
      keyboardType = EKeyboardType.DEFAULT;
      break;
    case EInputType.TEXTAREA:
      keyboardType = EKeyboardType.DEFAULT;
  }

  return (
    <TextInput
      secureTextEntry={inputType === EInputType.PASSWORD ? true : false}
      multiline={inputType === EInputType.TEXTAREA ? true : false}
      textAlignVertical={inputType === EInputType.TEXTAREA ? "top" : "center"}
      placeholder={placeholder}
      placeholderTextColor={colors.lightGrey}
      value={inputValue}
      style={styles.input}
      keyboardType={keyboardType}
      onChangeText={(text) => {
        setInputValue(text);
      }}
    />
  );
};

const useStyle = (inputType: EInputType) => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    input: {
      borderWidth: inputType === EInputType.TEXTAREA ? 2 : 0,
      paddingHorizontal: inputType === EInputType.TEXTAREA ? 10 : 0,
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderColor: colors.lightRed,
      height: inputType === EInputType.TEXTAREA ? 120 : 40,
      width: 0.8 * width,
      alignSelf: "center",
      fontSize: 16,
    },
  });

  return styles;
};

export default Input;
