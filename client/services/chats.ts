import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../configs/firebase";

export const chatsListener = (listener) => {
  const q = query(
    collection(db, "chats"),
    where("members", "array-contains", auth.currentUser?.uid),
    orderBy("lastUpdate", "desc")
  );
  return onSnapshot(q, listener);
};

export const messagesListener = (listener, chatId) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("creation", "desc")
  );
  return onSnapshot(q, listener);
};

export const sendMessage = async (chatId, message) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const chatRef = doc(db, "chats", chatId);

  await addDoc(messagesRef, {
    creator: auth.currentUser?.uid,
    message,
    creation: serverTimestamp(),
  });

  await updateDoc(chatRef, {
    lastUpdate: serverTimestamp(),
    lastMessage: message,
  });
};

export const createChat = async (contactId) => {
  try {
    const chatsRef = collection(db, "chats");
    const chatDoc = await addDoc(chatsRef, {
      lastUpdate: serverTimestamp(),
      lastMessage: "Send a first message",
      members: [contactId, auth.currentUser?.uid],
    });
    return chatDoc;
  } catch (error) {
    throw error;
  }
};
