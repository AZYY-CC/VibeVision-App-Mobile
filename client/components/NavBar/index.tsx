import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import styles from "./styles";

const NavBar = ({
  title,
  leftButton = { display: true },
  rightButton = { display: false },
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (leftButton.display ? navigation.goBack() : null)}
      >
        {leftButton.display && <Feather name="arrow-left" size={26} />}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (rightButton.display ? rightButton.action() : null)}
      >
        {rightButton.display && (
          <Feather name={rightButton.name} size={26} color={"black"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
