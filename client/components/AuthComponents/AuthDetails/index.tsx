import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useDispatch } from "react-redux";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const AuthDetails = ({ authPage, setDetailsPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const handleLoginWithEmailAndPassword = async () => {
    try {
      await dispatch(loginWithEmailAndPassword(email, password));
      Alert.alert("Login Successful!");
    } catch (error) {
      Alert.alert("Login Unsuccessful!");
    }
  };

  const handleRegisterWithEmailAndPassword = async () => {
    try {
      await dispatch(registerWithEmailAndPassword(email, password));
      Alert.alert("Register Successful!");
    } catch (error) {
      Alert.alert("Register Unsuccessful!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
      />

      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          authPage == 0
            ? handleLoginWithEmailAndPassword()
            : handleRegisterWithEmailAndPassword()
        }
      >
        <Text style={styles.buttonText}>
          {authPage == 0 ? "Sign In" : "Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthDetails;
