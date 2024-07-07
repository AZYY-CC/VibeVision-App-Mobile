import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth, CreatePost, EditProfile, EditProfileField } from "../screens";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../store/actions";
import { View } from "react-native";
import HomeNavigation from "./HomeNavigation";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const authUserObj = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  if (!authUserObj.loaded) {
    return <View></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authUserObj.authUser == null ? (
          <Stack.Screen
            name="auth"
            component={Auth}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={HomeNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="createPost"
              component={CreatePost}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editProfileField"
              component={EditProfileField}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
