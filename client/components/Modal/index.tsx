import { Text, View } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const Modal = () => {
  return (
    <BottomSheet
      snapPoints={["50%"]}
      index={0}
      handleHeight={40}
      enablePanDownToClose
    >
      <View>
        <Text>BottomSheet</Text>
      </View>
    </BottomSheet>
  );
};

export default Modal;
