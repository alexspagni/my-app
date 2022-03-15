import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import SearchImputText from "../components/SearchImputText";
import { expressApi } from "../api/getApi";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../reducers/singReducer";
import { sign } from "../type/differentType";
type SignUpType = {
  email: string;
  password: string;
};
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  const signState: sign = useSelector((store: any) => store?.sing);
  const dispatch = useDispatch();
  const signUp = async ({ email, password }: SignUpType) => {
    try {
      const response = await expressApi.post("/signup", { email, password });
      console.log(response.data);
    } catch (err: any) {
      console.log(err.message);
      dispatch(addError("somothing is gone wrong"));
    }
  };
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
      <Button title="signUp" onPress={() => signUp({ email, password })} />
      <Button
        title="go to sign in"
        onPress={() => navigation.navigate("SignIn")}
      />
      {signState.error_message ? <Text>{signState.error_message}</Text> : null}
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
