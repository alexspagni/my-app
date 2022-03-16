import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { SignScreen } from "../components/SignScreen";

import { sign } from "../type/differentType";

export const SignIn = () => {
  const signState: sign = useSelector((store: any) => store?.sing);

  return (
    <View style={styles.ContainerStyle}>
      <SignScreen
        HeaderScreen="Sing In to your account"
        ButtonTitle="Sign In"
        BottomText={`Don't you have an account?\nSign Up`}
        pageToNavigate="Sign Up"
        error_message={""}
        onSubmit={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
  },
});
