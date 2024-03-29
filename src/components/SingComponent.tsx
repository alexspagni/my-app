import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { SignComponentType } from "../type/differentType";
import { ButtonComponent } from "./ButtonComponent";
/**
 * This component is used to render on the screen a basic Sign in and Sign up for the user.
 * It accept 3 parameter:
 * Header Text--> it's just a string to show on the screen
 * onSubitm--> it's a function run when a user tap on the button: Sign in or Sign up.
 * error_message--> it's a string that say if an error occupered, during user's Sign in and Sign up.
 * buttonName--> just a string to set the title of the button.
 *
 */

export const SignComponent: React.FC<SignComponentType> = ({
  headerText,
  onSubmit,
  error_message,
  buttonName,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  const checkPattern = (word: string) => {
    const globalRegex = new RegExp(`[a-z0-9]{1,}@[a-z0-9]{1,}\\.[a-z]{1,}`);
    const result = globalRegex.test(word);
    return result;
  };
  React.useEffect(
    () =>
      navigation.addListener("blur", () => {
        setEmail("");
        setPassword("");
      }),
    [navigation]
  );
  return (
    <View>
      <Text style={styles.headerTextStyle}>{headerText}</Text>
      <View style={styles.backgroundStyleTextInput}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(newTerm) => setEmail(newTerm)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {checkPattern(email) ? (
        <Text style={styles.CorrectEmail}>email pattern correct</Text>
      ) : null}
      <View style={styles.backgroundStyleTextInput}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(newTerm) => setPassword(newTerm)}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {error_message != "" ? (
        <Text style={styles.ErrorMessageStyle}>{error_message}</Text>
      ) : null}
      <View style={styles.ButtonView}>
        <ButtonComponent
          heightButton={44}
          buttonColor="#2E8AF6"
          buttonName={buttonName}
          buttonWidth={230}
          onPressButton={() => onSubmit({ email, password })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ErrorMessageStyle: {
    fontSize: 14,
    color: "red",
    marginLeft: 40,
  },
  backgroundStyleTextInput: {
    backgroundColor: "#F0EEEE",
    height: 50,
    width: 310,
    marginLeft: 25,

    borderRadius: 32,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    maxHeight: 44,
  },
  inputStyle: {
    fontSize: 16,
    flex: 1,
    marginLeft: 24,
    color: "black",
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  headerTextStyle: {
    fontSize: 35,
    color: "white",
    marginLeft: 33,
    marginTop: 90,
    marginBottom: 15,
    fontWeight: "bold",
  },
  CorrectEmail: {
    color: "white",
    fontWeight: "bold",
    position: "relative",
    bottom: 10,
    marginLeft: 35,
  },
  ButtonView: {
    marginTop: 20,
    marginLeft: 60,
  },
});
