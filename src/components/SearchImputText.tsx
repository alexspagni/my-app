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
    marginLeft: 15,
    paddingLeft: 5,
    fontSize: 14,
    backgroundColor: "#F0EEEE",
    borderRadius: 10,
    width: 100,
  },
});
export default SearchImputText;
