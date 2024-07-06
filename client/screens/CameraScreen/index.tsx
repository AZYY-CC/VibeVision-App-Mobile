import React, { useEffect, useState, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";

import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";

import { Feather } from "@expo/vector-icons";

import styles from "./styles";

const CameraScreen: React.FC = () => {
  const [hasCameraPermissions, setHasCameraPermissions] =
    useState<boolean>(false);
  const [hasAudioPermissions, setHasAudioPermissions] =
    useState<boolean>(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] =
    useState<boolean>(false);

  const [galleryItems, setGalleryItems] = useState<MediaLibrary.Asset[]>([]);
  const [cameraType, setCameraType] = useState<"front" | "back">("back");
  const [isCameraReady, setIsCameraReady] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");

      if (galleryStatus.status === "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordResult = await cameraRef.current.recordAsync();

        const source = videoRecordResult?.uri;
        const sourceThumb = await generateThumbnail(source);
        navigation.navigate("createPost", { source, sourceThumb });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      let sourceThumb = await generateThumbnail(result.assets[0].uri);
      navigation.navigate("createPost", {
        source: result.assets[0].uri,
        sourceThumb,
      });
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return (
      <View>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          // ratio={"16:9"}
          facing={cameraType}
          onCameraReady={() => setIsCameraReady(true)}
          mode="video"
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(cameraType === "back" ? "front" : "back")
          }
        >
          <Feather name="refresh-ccw" size={24} color={"white"} />
          {/* <Text style={styles.iconText}>Flip</Text> */}
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setCameraFlash(cameraFlash === "off" ? "on" : "off")}
        >
          <Feather name="zap" size={24} color={"white"} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={styles.recordButton}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={styles.galleryButton}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={styles.galleryButtonImage}
                // source={{ uri: galleryItems[0].uri }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;
