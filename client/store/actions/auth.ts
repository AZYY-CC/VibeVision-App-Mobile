import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import { Dispatch } from "redux";
import { USER_STATE_CHANGE } from "../constants";
import { doc, onSnapshot } from "firebase/firestore";
import { getPostsByUser } from "./post";

export const userAuthStateListener = () => (dispatch: Dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getCurrentUserData());
      dispatch(getPostsByUser(auth.currentUser.uid));
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserData = () => (dispatch: Dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    return;
  }

  const userDocRef = doc(db, "user", user.uid);
  onSnapshot(userDocRef, (doc) => {
    if (doc.exists()) {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: doc.data(),
        loaded: true,
      });
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};
export const loginWithEmailAndPassword =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      throw new Error(error.message);
    }
  };

export const registerWithEmailAndPassword =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
