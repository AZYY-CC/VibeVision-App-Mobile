import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";

const PostSingleOverlay = ({ user, post }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>

      <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
    </View>
  );
};

export default PostSingleOverlay;
