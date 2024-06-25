import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image, StyleSheet, View } from "react-native";
import airbnbLogo from "./../assets/img/Airbnb-Logo-No-Text.webp";
import Sign from "../enum/Sign";
import GreyText from "./GreyText";
import Input from "./Input";
import EInputType from "../enum/InputType";
import { useState } from "react";
import Button from "./Button";
import Link from "./Link";

const SignForm = ({ sign }: { sign: Sign }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let redirectionText: string;
  switch (sign) {
    case Sign.SIGNIN:
      redirectionText = "No account ? Register";
      break;
    case Sign.SIGNUP:
      redirectionText = "Already have an account ? Sign in";
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.scrollView}
    >
      <View style={styles.section1}>
        <Image source={airbnbLogo} style={styles.logo} resizeMode="cover" />
        <GreyText isBold size={30} isCentered>
          {sign}
        </GreyText>
      </View>
      <View style={styles.section2}>
        <Input
          inputType={EInputType.EMAIL}
          placeholder="email"
          inputValue={email}
          setInputValue={setEmail}
        />
        <Input
          inputType={EInputType.PASSWORD}
          placeholder="password"
          inputValue={password}
          setInputValue={setPassword}
        />
      </View>
      <View style={styles.section3}>
        <Button text={sign} />
        <Link isCentered href={"/signup"} redirectionText={redirectionText} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  logo: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  section1: {
    gap: 20,
  },
  section2: {
    gap: 20,
  },
  section3: {
    gap: 20,
  },
});

export default SignForm;
