import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import SearchImputText from "../components/SearchImputText";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.TextStyle}>Insert your email</Text>
      <SearchImputText
        term={email}
        value="Insert Email"
        onChangeText={(newTerm) => setEmail(newTerm)}
      />
      <Text style={styles.TextStyle}>Insert your password</Text>
      <SearchImputText
        term={password}
        value="Insert password"
        onChangeText={(newTerm) => setPassword(newTerm)}
      />
      <Button
        title="go to sign up"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerPrincipal: {
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "#353839",
    flex: 1,
  },
  TextStyle: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
  InnerContainer: {
    paddingBottom: 300,
  },
});
