// import firebase from "firebase";
import { Provider } from "react-redux";
import { store } from "./store";
import { Auth } from "./screens";

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
      <Auth />
    </Provider>
  );
}
