import { Video } from "expo-av";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "./styles";
import { useUser } from "../../../hooks/userUser";
import PostSingleOverlay from "./PostSingleOverlay";

const PostSingle = ({ item }, parentRef) => {
  const ref = useRef<Video>(null);
  const user = useUser(item.creator).data;
  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

  const play = async () => {
    if (ref.current == null) {
      return;
    }

    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (error: any) {
      console.log("Error:", error);
    }
  };

  const stop = async () => {
    if (ref.current == null) {
      return;
    }

    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (error: any) {
      console.log("Error:", error);
    }
  };

  const unload = async () => {
    if (ref.current == null) {
      return;
    }

    try {
      await ref.current.unloadAsync();
    } catch (error: any) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <PostSingleOverlay user={user} post={item} />
      <Video
        ref={ref}
        style={styles.container}
        resizeMode={"cover"}
        shouldPlay={false}
        isLooping
        usePoster
        useNativeControls
        posterSource={{ uri: item.media[1] }}
        posterStyle={{ resizeMode: "cover", height: "100%" }}
        source={{ uri: item.media[0] }}
      />
    </>
  );
};

export default forwardRef(PostSingle);
