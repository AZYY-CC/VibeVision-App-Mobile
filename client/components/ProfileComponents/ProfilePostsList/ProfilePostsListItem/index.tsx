import { TouchableOpacity, Image } from "react-native";
import React from "react";

import styles from "./styles";

const ProfilePostsListItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: item.media[1] }} />
    </TouchableOpacity>
  );
};

export default ProfilePostsListItem;
