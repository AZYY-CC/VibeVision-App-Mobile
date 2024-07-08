import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import {
  ProfileHeader,
  ProfileNavBar,
  ProfilePostsList,
} from "../../components";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={currentUser} />
      <ProfileHeader user={currentUser} />
      <ProfilePostsList posts={currentUserPosts} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
