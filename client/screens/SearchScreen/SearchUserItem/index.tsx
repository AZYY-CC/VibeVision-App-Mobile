import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";

const SearchUserItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{item.displayName}</Text>
      <Image style={styles.image} source={{ uri: item.photoURL }} />
    </TouchableOpacity>
  );
};

export default SearchUserItem;
