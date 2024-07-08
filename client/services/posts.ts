import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db } from "../configs/firebase";

export const getFeed = async () => {
  const postCollection = collection(db, "posts");

  try {
    const res = await getDocs(postCollection);
    const posts = res.docs.map((value) => {
      const id = value.id;
      const data = value.data();
      return { id, ...data };
    });
    return posts;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLikeById = async (postId, uid) => {
  try {
    const likeDoc = doc(db, "posts", postId, "likes", uid);
    const res = await getDoc(likeDoc);

    return res.exists();
  } catch (error) {
    throw new Error("Failed to retrieve like data");
  }
};

export const updateLike = async (postId, uid, currentLikeState) => {
  try {
    const postRef = doc(db, "posts", postId);
    const likeDoc = doc(postRef, "likes", uid);

    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      if (!postDoc.exists()) {
        throw new Error("Post does not exist");
      }

      const newLikesCount = currentLikeState
        ? postDoc.data().likesCount - 1
        : postDoc.data().likesCount + 1;

      if (currentLikeState) {
        transaction.delete(likeDoc);
      } else {
        transaction.set(likeDoc, {});
      }

      transaction.update(postRef, { likesCount: newLikesCount });
    });
  } catch (error: any) {
    throw new Error("Failed to update like state: " + error.message);
  }
};
