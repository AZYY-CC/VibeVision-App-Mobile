import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  containerMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 25,
    color: 'darkslategray',
    textAlign: 'center',
  },
  providerButton: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  providerButtonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  containerBottomButton: {
    backgroundColor: 'ghostwhite',
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomButtonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
});

export default styles;
