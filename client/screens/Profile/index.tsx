import { ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { ProfileHeader, ProfileNavBar } from "../../components";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  console.log(authUser);
  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={authUser} />
      <ScrollView>
        <ProfileHeader user={authUser} />
        {/* <ProfilePostList posts={userPosts} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
