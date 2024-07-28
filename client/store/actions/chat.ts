import { Dispatch } from "redux";
import { CHATS_SET } from "../constants";

export const setChats = (data) => (dispatch: Dispatch) =>
  dispatch({ data, type: CHATS_SET });
