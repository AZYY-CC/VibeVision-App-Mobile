import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../configs/firebase";
import { saveMediaToStorage } from "./random";
import { Dispatch } from "redux";

export const createPost =
  (description, video, thumbnail) => async (dispatch: Dispatch) => {
    let storagePostId = uuidv4();
    try {
      let media = await Promise.all([
        saveMediaToStorage(
          video,
          `post/${auth.currentUser.uid}/${storagePostId}/video`
        ),
        saveMediaToStorage(
          thumbnail,
          `post/${auth.currentUser.uid}/${storagePostId}/thumbnail`
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

export const getPostsByUser =
  (uid = auth.currentUser.uid) =>
  async (dispatch: Dispatch) => {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("creator", "==", uid),
      orderBy("creation", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: "CURRENT_USER_POSTS_UPDATE",
          currentUserPosts: posts,
        });
      },
      (error) => {
        console.error("Error fetching user posts: ", error);
      }
    );

    return unsubscribe;
  };
