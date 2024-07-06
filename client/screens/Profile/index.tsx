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
  const authUser = useSelector((state) => state.auth.authUser);
  const authUserPosts = useSelector((state) => state.posts.authUserPosts);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={authUser} />
      <ProfileHeader user={authUser} />
      <ProfilePostsList posts={authUserPosts} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
