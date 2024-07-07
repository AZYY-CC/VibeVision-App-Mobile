import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../configs/firebase";

export const saveMediaToStorage = async (media, path) => {
  const fileRef = ref(storage, path);
  try {
    const response = await fetch(media);
    const blob = await response.blob();
    const snapshot = await uploadBytes(fileRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log(downloadUrl)
    return downloadUrl;
  } catch (error) {
    throw error;
  }
};
