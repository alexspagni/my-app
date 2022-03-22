import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type FormProps = {
  term: string;
  value: string;
  onChangeText(s: string): void;
};
const SearchImputText: React.FC<FormProps> = ({
  term,
  value,
  onChangeText,
}) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={value}
        value={term}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    margin: 10,
    fontSize: 18,
    backgroundColor: "#F0EEEE",
  },
});
export default SearchImputText;
