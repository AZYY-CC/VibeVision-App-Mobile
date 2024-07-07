import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../../../../components";
import { Divider } from "react-native-paper";
import styles from "./styles";
import generalStyles from "../../../../styles/generalStyles";
import { saveUserField } from "../../../../services/user";

const EditProfileField = ({ route }) => {
  const { title, field, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);

  const navigation = useNavigation();

  const handleOnSave = async () => {
    await saveUserField(field, textInputValue);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        title={title}
        rightButton={{
          display: textInputValue ? true : false,
          name: "save",
          action: handleOnSave,
        }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={generalStyles.textInput}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileField;
