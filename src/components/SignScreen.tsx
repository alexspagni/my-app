import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { Input } from "react-native-elements";
type props = {
  HeaderScreen: string;
  ButtonTitle: string;
  BottomText: string;
  pageToNavigate: string;
  error_message: string;
  onSubmit: ({ email, password }: SignUpType) => void;
};
type SignUpType = {
  email: string;
  password: string;
};
export const SignScreen = ({
  HeaderScreen,
  ButtonTitle,
  BottomText,
  pageToNavigate,
  error_message,
  onSubmit,
}: props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkPattern = (word: string) => {
    const globalRegex = new RegExp(`[a-z0-9]{1,}@[a-z0-9]{1,}\\.[a-z]{1,}`);
    const result = globalRegex.test(word);
    return result;
  };
  const input = React.createRef<any>();

  return (
    <View>
      <Text style={styles.HeaderScreenStyle}>{HeaderScreen}</Text>

      <Input
        ref={input}
        label="Email"
        value={email}
        placeholder="Insert your email"
        onChangeText={(newTerm) => setEmail(newTerm)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {checkPattern(email) ? (
        <Text>email correct</Text>
      ) : (
        <Text style={styles.ErrorEmailStyle}>check your email</Text>
      )}
      <Input
        label="Password"
        value={password}
        placeholder="Insert your password"
        onChangeText={(newTerm) => setPassword(newTerm)}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error_message != "" ? (
        <Text style={styles.ErrorMessageStyle}>{error_message}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          if (checkPattern(email)) {
            onSubmit({ email, password });
          }
        }}
      >
        <Text style={styles.textButton}>{ButtonTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationContainerRef.current?.navigate(pageToNavigate)}
      >
        <Text style={styles.TextSignIn}>{BottomText}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  InnerContainer: {
    paddingBottom: 300,
  },
  ErrorMessageStyle: {
    fontSize: 18,
    color: "red",
    paddingBottom: 5,
    paddingTop: 5,
  },
  Button: {
    position: "relative",
    left: 100,
    height: 40,
    width: 150,
    backgroundColor: "#4863A0",
    marginTop: 15,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  TextSignIn: {
    position: "relative",
    left: 15,
    fontSize: 18,
    color: "#4863A0",
    paddingTop: 15,
  },
  HeaderScreenStyle: {
    marginBottom: 10,
    position: "relative",
    left: 15,
    fontSize: 30,
    fontWeight: "bold",
  },
  ErrorEmailStyle: {
    color: "red",
    position: "relative",
    bottom: 10,
    marginLeft: 8,
  },
});
