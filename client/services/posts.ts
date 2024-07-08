import { collection, getDocs } from "firebase/firestore";
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
