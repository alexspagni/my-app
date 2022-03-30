import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { TextInputType } from "../type/differentType";
/**
 * I decided to use a reusable component beacause I have three identical text boxes.
 * It accept 3 paramether:
 * term-->value i show on text input every time a user write something on the screen.
 * value-->is just a placeholder to show when a user haven't written anything yet.
 * onChangeText-->it is a function that is run every time a user write somthing on text input.
 *
 *
 */
const SearchImputText: React.FC<TextInputType> = ({
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
