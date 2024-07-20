import { StyleSheet } from "react-native";
const buttonStyles = StyleSheet.create({
  grayOutlinedButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  grayOutlinedIconButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  filledButton: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "black",
  },
  filledButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  grayOutlinedButtonText: {
    color: "black",
    fontWeight: "700",
  },
});

export default buttonStyles;
