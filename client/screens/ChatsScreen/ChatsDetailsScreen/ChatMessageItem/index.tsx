import React from "react";
import { View, Text, Image } from "react-native";
import { useUser } from "../../../../hooks/useUser";
import generalStyles from "../../../../styles/generalStyles";
import { auth } from "../../../../configs/firebase";

import styles from "./styles";

const ChatMessageItem = ({ item }) => {
  const { data: userData, isLoading } = useUser(item.creator);

  if (isLoading) {
    return <></>;
  }

  const isCurrentUser = item.creator === auth.currentUser?.uid;

  return (
    <View
      style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
    >
      <Image
        style={generalStyles.avatarSmall}
        source={{ uri: userData.photoURL }}
      />
      <View
        style={
          isCurrentUser
            ? styles.containerTextCurrent
            : styles.containerTextOther
        }
      >
        <Text style={styles.text}>{item.message}</Text>
      </View>
    </View>
  );
};

export default ChatMessageItem;
