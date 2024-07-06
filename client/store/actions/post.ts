import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../configs/firebase";
import { saveMediaToStorage } from "./random";

export const createPost = (description, video) => async (dispatch) => {
  let storagePostId = uuidv4();
  try {
    let media = await Promise.all([
      saveMediaToStorage(
        video,
        `posts/${auth.currentUser.uid}/${storagePostId}/video`
      ),
    ]);

    await addDoc(collection(db, "posts"), {
      creator: auth?.currentUser?.uid,
      media,
      description,
      likesCount: 0,
      commentsCount: 0,
      creation: serverTimestamp(),
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
