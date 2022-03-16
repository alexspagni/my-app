import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchImputText from "../components/SearchImputText";
import { navigationContainerRef } from "../Navigator/ContainerRef";

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

  return (
    <View>
      <Text style={styles.HeaderScreenStyle}>{HeaderScreen}</Text>
      <Text style={styles.TextStyle}>Insert your email</Text>
      <SearchImputText
        term={email}
        value="Insert Email"
        onChangeText={(newTerm) => setEmail(newTerm)}
      />
      <Text style={styles.TextStyle}>Insert your password</Text>
      <SearchImputText
        term={password}
        value="Insert Password"
        onChangeText={(newTerm) => setPassword(newTerm)}
      />
      {error_message ? (
        <Text style={styles.ErrorMessageStyle}>{error_message}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.Button}
        onPress={() => onSubmit({ email, password })}
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
  TextStyle: {
    fontSize: 18,
    color: "black",
    padding: 10,
  },
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
    position: "relative",
    left: 15,
    fontSize: 30,
    fontWeight: "bold",
  },
});
