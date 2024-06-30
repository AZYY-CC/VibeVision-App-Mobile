import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../configs/firebase";
import { Dispatch } from "redux";

export const loginWithEmailAndPassword = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      dispatch({ type: 'LOGIN_SUCCESS' })
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message })
      throw new Error(error.message)
    }
  }

export const registerWithEmailAndPassword =
  (email: string, password: string) => async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
