import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/core";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/actions";

const CreatePost = ({ route }) => {
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const handleSavePost = async () => {
    setRequestRunning(true);
    try {
      await dispatch(createPost(description, route.params.source,route.params.sourceThumb));
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      Alert.alert("Error", `${error}`);
      setRequestRunning(false);
    }
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputText}
            maxLength={150}
            multiline
            onChangeText={(text) => setDescription(text)}
            placeholder="Describe your video"
          />
          <Image
            style={styles.mediaPreview}
            source={{ uri: route.params.source }}
          />
        </View>
        <View style={styles.spacer} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Feather name="x" size={24} color="black" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSavePost} style={styles.postButton}>
            <Feather name="corner-left-up" size={24} color="white" />
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;
