import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";

const VideoWebView = ({
  setOriginalLink,
  setShowLoading,
  setVideo,
  originalLink,
  type,
}) => {
  const webRef = useRef();
  const jsCode =
    'window.ReactNativeWebView.postMessage(document.querySelector(".fp-play").click())';
  const jsCode_2 =
    'window.ReactNativeWebView.postMessage(document.querySelector("#overlay").click())';

  const checkTypeAndGetMovieData = () => {
    if (type == "type1" || type == "type4") {
      webRef.current.injectJavaScript(
        'window.ReactNativeWebView.postMessage(document.querySelector("video").getAttribute("src"))'
      );
    } else if (type == "type2") {
      webRef.current.injectJavaScript(
        'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
      );
    } else if (type == "type3") {
      webRef.current.injectJavaScript(
        'window.ReactNativeWebView.postMessage(document.querySelector(".fp-engine").getAttribute("src"))'
      );
    } else if (type == "type4") {
      webRef.current.injectJavaScript(
        'window.ReactNativeWebView.postMessage(document.querySelector("video").getAttribute("src"))'
      );
    }
  };

  const handleOnMessage = (mess) => {
    console.log(mess);

    if (typeof mess !== "undefined") {
      if (
        mess.nativeEvent.data !== "undefined" &&
        mess.nativeEvent.data !== "none"
      ) {
        const data = mess.nativeEvent.data;

        if (data == null) return;

        if (data.indexOf("https:") < 0) {
          setVideo("https:" + data);
        } else {
          setVideo(data);
        }

        setOriginalLink("");
        setShowLoading(false);
      } else {
        checkTypeAndGetMovieData();
      }
    } else {
      checkTypeAndGetMovieData();
    }
  };

  return (
    <View>
      <WebView
        source={{
          uri: originalLink,
        }}
        style={styles.webViewContainer}
        ref={webRef}
        injectedJavaScript={
          type == "type3" ? jsCode : type == "type4" ? jsCode_2 : ""
        }
        onNavigationStateChange={(state) => {
          console.log(state);
          if (!state.loading) {
            checkTypeAndGetMovieData();
          }
        }}
        onMessage={handleOnMessage}
      />
    </View>
  );
};

export default VideoWebView;

const styles = StyleSheet.create({
  webViewContainer: {
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
