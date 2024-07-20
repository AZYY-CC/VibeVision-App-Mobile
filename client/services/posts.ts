import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../configs/firebase";

let commentListenerInstance = null;

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
  } catch (error) {
    throw new Error("Failed to update like state: " + error.message);
  }
};

export const addComment = async (postId, creator, comment) => {
  const commentsRef = collection(
    doc(collection(db, "posts"), postId),
    "comments"
  );
  const postRef = doc(db, "posts", postId);

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      if (!postDoc.exists()) {
        throw new Error("Post does not exist");
      }

      const newCommentsCount = postDoc.data().commentsCount + 1;

      await addDoc(commentsRef, {
        creator,
        comment,
        creation: serverTimestamp(),
      });

      transaction.update(postRef, { commentsCount: newCommentsCount });
    });
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
};

export const commentListener = (postId, setCommentList) => {
  const commentsRef = collection(
    doc(collection(db, "posts"), postId),
    "comments"
  );
  const commentsQuery = query(commentsRef, orderBy("creation", "desc"));

  commentListenerInstance = onSnapshot(commentsQuery, (snapshot) => {
    if (snapshot.docChanges().length === 0) {
      return;
    }
    const comments = snapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      return { id, ...data };
    });
    setCommentList(comments);
  });
};

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};

export const getPostsByUserId = async (uid = auth.currentUser?.uid) => {
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('creator', '==', uid),
      orderBy('creation', 'desc')
    )

    const posts = await new Promise((resolve, reject) => {
      onSnapshot(postsQuery, (snapshot) => {
        const postsData = snapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
        })
        resolve(postsData)
      }, reject)
    })

    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}