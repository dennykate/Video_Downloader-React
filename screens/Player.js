import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from "react-native";

// import expo dependencies
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

const Player = ({ route }) => {
  const { video: MOVIE_URL } = route.params;
  // back press
  const defaultSetUp = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };
  BackHandler.addEventListener("hardwareBackPress", defaultSetUp);

  const video = useRef(null);
  const [load, setLoad] = useState(false);
  const [lineError, setLineError] = useState(true);
  const [keyForAutoPlay, setKeyForAutoPlay] = useState(0);
  const [status, setStatus] = useState({});
  const [rotate, setRotate] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Video
        ref={video}
        style={[styles.video, { height: !rotate ? "100%" : "90%" }]}
        source={{ uri: MOVIE_URL }}
        useNativeControls={true}
        resizeMode="contain"
        isLooping={true}
        onPlaybackStatusUpdate={(status) => {
          //set state data
          setLoad(status.isLoaded);
          setLineError(status.isPlaying);
          setStatus(() => status);

          // auto play
          if (keyForAutoPlay == 0) {
            if (status.isLoaded) {
              video.current.playAsync();
              setKeyForAutoPlay(1);
            }
          }
        }}
      />

      {!load || !lineError ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={60} color="red" style={styles.loading} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.rotateBtn}
          activeOpacity={0.5}
          onPress={() => {
            if (!rotate) {
              ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
              );
              setRotate(true);
            } else {
              ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
              );
              setRotate(false);
            }
          }}
        >
          <Image
            source={require("../assets/image/rotate-icon.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
  },
  loading: {
    transform: [{ translateY: 20 }],
    padding: 40,
    backgroundColor: "#00000071",
    borderRadius: 70,
  },
  adsContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    position: "absolute",
  },
  rotateBtn: {
    width: 30,
    height: 30,
    top: 30,
    left: 20,
    position: "absolute",
  },
  image: {
    width: 30,
    height: 30,
    opacity: 0.8,
  },
});

export default Player;
