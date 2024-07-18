import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getLikeById, updateLike } from "../../../../services/posts";

import styles from "./styles";
import { openCommentModal } from "../../../../store/actions";

const PostSingleOverlay = ({ user, post }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch()
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });

  useEffect(() => {
    getLikeById(post.id, currentUser.uid).then((res) => {
      console.log(res);
      setCurrentLikeState({
        counter: post.likesCount,
        state: res,
      });
    });
  }, []);

  const handleUpdateLike = () => {
    setCurrentLikeState({
      state: !currentLikeState.state,
      counter: currentLikeState.counter + (currentLikeState.state ? -1 : 1),
    });
    updateLike(post.id, currentUser.uid, currentLikeState.state);
  };

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

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUpdateLike(currentLikeState)}
        >
          <Ionicons
            color={currentLikeState.state ? "red" : "white"}
            size={40}
            name={currentLikeState.state ? "heart" : "heart-outline"}
          />
          <Text style={styles.actionButtonText}>
            {currentLikeState.counter}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => dispatch(openCommentModal(true, post))}
        >
          <Ionicons color="white" size={40} name={"chatbubble"} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostSingleOverlay;
