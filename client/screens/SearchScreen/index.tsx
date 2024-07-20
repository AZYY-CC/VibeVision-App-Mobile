import React, { useEffect, useState } from "react";
import { TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import SearchUserItem from "./SearchUserItem";
import { queryUsersByEmail } from "../../services/user";

const SearchScreen = () => {
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    queryUsersByEmail(textInput).then(setSearchUsers);
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder={"Search"}
      />

      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
