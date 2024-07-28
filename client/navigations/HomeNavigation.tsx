import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import {
  CameraScreen,
  ChatsScreen,
  HomeFeedScreen,
  ProfileScreen,
  SearchScreen,
} from "../screens";
import FeedNavigation from "./FeedNavigation";
import { auth } from "../configs/firebase";
import { useChats } from "../hooks/useChats";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return <View></View>;
};

const HomeNavigation = () => {
  useChats();

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "white" }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={FeedNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        initialParams={{ initialUserId: auth.currentUser?.uid }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
