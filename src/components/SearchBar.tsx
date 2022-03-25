import React from "react";
import { Text, StyleSheet, View, Button, TextInput } from "react-native";
/**
 * in pratica per importare un icona devi andare su questo sito:
 * https://expo.github.io/vector-icons
 * poi metti tra parentesi graffe il nome che si trova nella seconda colonna come secondo valore
 * ed importa da '@expo/vector-icons'
 * ora puoi utilizzare l'icona. ricorda che hai importato una libreria
 , cioè father è una libreria
*/
import { Feather } from "@expo/vector-icons"; // importo l'icona della lente di ingrandimento
type SearchBarType = {
  term: string;
  onTermChange: (s: string) => void;
};
export const SearchBar: React.FC<SearchBarType> = ({ term, onTermChange }) => {
  //term===state variable
  //onTermChange===callback
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search for new photos"
        value={term}
        onChangeText={onTermChange}
        autoCapitalize="none"
        autoCorrect={false}
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
