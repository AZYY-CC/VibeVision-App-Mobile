import { View, FlatList } from "react-native";
import React from "react";
import ProfilePostsListItem from "./ProfilePostsListItem";
import styles from "./styles";

const ProfilePostsList = ({ posts }) => {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfilePostsListItem item={item} />}
      />
    </View>
  );
};

export default ProfilePostsList;
