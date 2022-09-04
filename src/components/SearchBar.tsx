import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
/**
 * This is the search bar that is shown in the IndexScreen.
 * It receive 3 a parameter :
 * term-->is what i write on the search bar
 * onTermChange--> when a user types on the serch bar, this function is run
 * onEndEditing--> when a user click on stops writing this function is run
 */
import { Feather } from "@expo/vector-icons";
type SearchBarType = {
  term: string;
  onTermChange: (s: string) => void;
  onEndEditing: () => void;
};
export const SearchBar: React.FC<SearchBarType> = ({
  term,
  onTermChange,
  onEndEditing,
}) => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search for new photos"
        value={term}
        onChangeText={onTermChange}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={() => {
          onEndEditing();
          onTermChange("");
        }}
      />
      <Feather name="search" style={styles.iconStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEE",
    height: 44,
    width: 327,
    borderRadius: 32,
    marginHorizontal: 15,
    marginTop: 40,
    flexDirection: "row",
    marginBottom: 10,
  },
  inputStyle: {
    fontSize: 16,
    color: "black",
    flex: 1,
    marginLeft: 10,
  },
  iconStyle: {
    fontSize: 20,
    alignSelf: "center",
    marginHorizontal: 15,
    opacity: 0.5,
  },
});
