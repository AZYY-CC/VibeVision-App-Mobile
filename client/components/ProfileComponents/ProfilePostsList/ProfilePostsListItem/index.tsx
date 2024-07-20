import { TouchableOpacity, Image } from "react-native";
import React from "react";

import styles from "./styles";
import { useNavigation } from "@react-navigation/core";

const ProfilePostsListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("userPosts", {
          creator: item.creator,
          profile: true,
        })
      }
    >
      <Image style={styles.image} source={{ uri: item.media[1] }} />
    </TouchableOpacity>
  );
};

export default ProfilePostsListItem;
