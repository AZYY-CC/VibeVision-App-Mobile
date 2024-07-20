import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import {
  ProfileHeader,
  ProfileNavBar,
  ProfilePostsList,
} from "../../components";
import { useSelector } from "react-redux";
import { CurrentUserProfileItemInViewContext } from "../../navigations/FeedNavigation";
import { useUser } from "../../hooks/userUser";
import { getPostsByUserId } from "../../services/posts";

const ProfileScreen = ({ route }) => {
  const { initialUserId } = route.params;

  const [userPosts, setUserPosts] = useState([]);

  let providerUserId = null;

  if (CurrentUserProfileItemInViewContext != null) {
    providerUserId = useContext(CurrentUserProfileItemInViewContext);
  }

  const user = useUser(initialUserId ? initialUserId : providerUserId).data;

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    getPostsByUserId(user.uid).then(setUserPosts);
  }, [user]);

  if (user === undefined) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ProfileHeader user={user} />
      <ProfilePostsList posts={userPosts} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
