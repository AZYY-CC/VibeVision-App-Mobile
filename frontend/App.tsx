import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// import firebase from "firebase";
import { Provider } from "react-redux";
import { store } from "./store";


// if (firebase.apps.length === 0) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyCkxB5hQCHehkCEV1Nund2-8rlcBpRdnuY",
//     authDomain: "vibevision-app-mobile.firebaseapp.com",
//     projectId: "vibevision-app-mobile",
//     storageBucket: "vibevision-app-mobile.appspot.com",
//     messagingSenderId: "13103397525",
//     appId: "1:13103397525:web:07b94dc4e54e48cd47f99c",
//     measurementId: "G-VVP4F2QHX2",
//   });
// }

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>VibeVision App</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
