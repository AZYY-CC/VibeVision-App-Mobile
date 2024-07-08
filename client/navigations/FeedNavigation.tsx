import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeFeedScreen, ProfileScreen } from "../screens";

const { Screen, Navigator } = createMaterialTopTabNavigator();

const FeedNavigation = () => {
  return (
    <Navigator initialRouteName="feedList" tabBar={() => <></>}>
      <Screen name="feedList" component={HomeFeedScreen} />
      <Screen name="feedProfile" component={ProfileScreen} />
    </Navigator>
  );
};

export default FeedNavigation;
