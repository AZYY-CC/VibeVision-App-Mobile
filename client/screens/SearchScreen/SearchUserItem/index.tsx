import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";

const SearchUserItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("profileOther", { initialUserId: item?.uid })
      }
    >
      <Text style={styles.text}>{item.displayName}</Text>
      <Image style={styles.image} source={{ uri: item.photoURL }} />
    </TouchableOpacity>
  );
};

export default SearchUserItem;
