import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const PostSingleOverlay = ({ user, post }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>

      <View style={styles.leftContainer}>
        <TouchableOpacity>
          <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons color="white" size={40} name={"heart-outline"} />
          <Text style={styles.actionButtonText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons color="white" size={40} name={"chatbubble"} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostSingleOverlay;
