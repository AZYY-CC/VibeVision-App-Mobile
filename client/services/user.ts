import { auth, db } from "../configs/firebase";
import { saveMediaToStorage } from "./random";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// export const saveUserProfileImage = async (image) => {
//   try {
//     const res = await saveMediaToStorage(
//       image,
//       `profileImage/${auth.currentUser.uid}`
//     );
//     const userDoc = doc(db, "user", auth.currentUser.uid);
//     await updateDoc(userDoc, {
//       photoURL: res,
//     });
//   } catch (error: any) {
//     throw new Error("Failed to update user profile image: " + error.message);
//   }
// };

export const saveUserProfileImage = async (image) => {
  try {
    console.log(image);
  } catch (error: any) {
    throw new Error("Failed to update user profile image: " + error.message);
  }
};

export const saveUserField = async (field, value) => {
  const userDoc = doc(db, "user", auth.currentUser.uid);
  const obj = { [field]: value };

  try {
    await updateDoc(userDoc, obj);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const queryUsersByEmail = async (email: string) => {
  if (email === "") {
    return [];
  }

  const userCollection = collection(db, "user");
  const emailQuery = query(
    userCollection,
    where("email", ">=", email),
    where("email", "<=", email + "\uf8ff")
  );

  try {
    const snapshot = await getDocs(emailQuery);
    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};
