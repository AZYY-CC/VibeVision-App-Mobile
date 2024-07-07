import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { NavBar } from "../../../components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfileImage } from "../../../services/user";

const EditProfile = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const navigation = useNavigation();
  const chooseImage = async () => {
    Alert.alert(
      "Feature Not Available",
      "The image picker feature is currently under development. Please check back later for updates."
    );

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });
    // if (!result.canceled) {

    // TODO: Implement Change photoURL For AuthUser
    // saveUserProfileImage(result.assets[0].uri);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar title={"Edit Profile"} />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageViewContainer}
          onPress={chooseImage}
        >
          <Image style={styles.image} source={{ uri: authUser.photoURL }} />
          <View style={styles.imageOverlay} />
          <Feather name="camera" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() =>
            navigation.navigate("editProfileField", {
              title: "Display Name",
              field: "displayName",
              value: authUser.displayName,
            })
          }
        >
          <Text>Display Name</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{authUser.displayName}</Text>
            <Feather name="chevron-right" size={20} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
