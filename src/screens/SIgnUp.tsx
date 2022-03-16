import { View, StyleSheet } from "react-native";
import { expressApi } from "../api/getApi";
import { useDispatch, useSelector } from "react-redux";
import { addError, addToken } from "../reducers/singReducer";
import { sign } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { SignScreen } from "../components/SignScreen";
type SignUpType = {
  email: string;
  password: string;
};
export const SignUp = () => {
  const signState: sign = useSelector((store: any) => store?.sing);
  const dispatch = useDispatch();
  const signUp = async ({ email, password }: SignUpType) => {
    try {
      const response = await expressApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(addToken(response.data.token));
      navigationContainerRef.current?.navigate("drawer");
    } catch (err: any) {
      console.log(err.message);
      dispatch(addError("something is gone wrong"));
    }
  };
  return (
    <View style={styles.ContainerStyle}>
      <SignScreen
        HeaderScreen="Sing Up to use App"
        ButtonTitle="Sign Up"
        BottomText={`Do you already have an account?\nSign in`}
        pageToNavigate="Sign In"
        error_message={signState.error_message}
        onSubmit={signUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
  },
});
