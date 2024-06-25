import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image, StyleSheet, View } from "react-native";
import airbnbLogo from "./../assets/img/Airbnb-Logo-No-Text.webp";
import ESign from "../enum/Sign";
import GreyText from "./GreyText";
import Input from "./Input";
import EInputType from "../enum/InputType";
import { useState } from "react";
import Button from "./Button";
import Link from "./Link";
import ErrorText from "./ErrorText";

const SignForm = ({ sign }: { sign: ESign }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [isSignDisabled, setIsSignDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSignPress = () => {
    setIsSignDisabled(true);
    setErrorMessage("");
    try {
      if (email.length === 0) {
        throw new Error("Please enter an email");
      }
      if (password.length === 0) {
        throw new Error("Please enter a password");
      }
      if (sign === ESign.SIGNUP) {
        if (description.length === 0) {
          throw new Error("Please describe yourself");
        }
        if (username.length === 0) {
          throw new Error("Please enter a username");
        }
        if (confirmedPassword !== password) {
          throw new Error("Passwords must be the same");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unknow error occured. Please try later.");
      }
    }
    setIsSignDisabled(false);
  };

  let redirectionText: string;
  switch (sign) {
    case ESign.SIGNIN:
      redirectionText = "No account ? Register";
      break;
    case ESign.SIGNUP:
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
        {sign === ESign.SIGNUP && (
          <>
            <Input
              inputType={EInputType.TEXT}
              placeholder="username"
              inputValue={username}
              setInputValue={setUsername}
            />
            <Input
              inputType={EInputType.TEXTAREA}
              placeholder="Describe yourself in a few words..."
              inputValue={description}
              setInputValue={setDescription}
            />
          </>
        )}
        <Input
          inputType={EInputType.PASSWORD}
          placeholder="password"
          inputValue={password}
          setInputValue={setPassword}
        />
        {sign === ESign.SIGNUP && (
          <Input
            inputType={EInputType.PASSWORD}
            placeholder="confirm password"
            inputValue={confirmedPassword}
            setInputValue={setConfirmedPassword}
          />
        )}
      </View>
      <View style={styles.section3}>
        {errorMessage && <ErrorText isCentered>{errorMessage}</ErrorText>}
        <Button text={sign} onPress={onSignPress} isDisabled={isSignDisabled} />
        <Link
          isCentered
          href={sign === ESign.SIGNIN ? "/signup" : "/login"}
          redirectionText={redirectionText}
        />
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
