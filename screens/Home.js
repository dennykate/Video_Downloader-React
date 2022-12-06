import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ToastAndroid,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AdMobBanner, AdMobRewarded } from "expo-ads-admob";

import VideoWebView from "../components/VideoWebView";
import { db } from "../config/config";

const Home = ({ navigation, route }) => {
  const scrollRef = useRef();

  const [showLoading, setShowLoading] = useState(false);
  const [link, setLink] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [type, setType] = useState("");
  const [video, setVideo] = useState("");
  const [appStart, setAppStart] = useState(false);
  const [admobCode, setAdmobCode] = useState(null);

  useEffect(() => {
    fetchAdmobCodeFromFirebase();
  }, []);

  const fetchAdmobCodeFromFirebase = async () => {
    const admobRef = await db.firestore().collection("admob_ads");
    admobRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAdmobCode(doc.data());
      });
    });
  };

  const handleGetVideo = async () => {
    if (!link) {
      ToastAndroid.show("missing link!", ToastAndroid.SHORT);

      return;
    }
    autoScroll();
    interstitial();
    setShowLoading(true);
    setAppStart(true);
    ToastAndroid.show("please wait!", ToastAndroid.SHORT);

    const [orgLink, typ] = link.split("&?");
    if (!orgLink || !typ) return;

    setOriginalLink(orgLink);
    setType(typ);

    setLink("");
  };

  const autoPaste = async () => {
    const text = await Clipboard.getStringAsync();
    setAppStart(false);
    setLink(text);
    ToastAndroid.show("link pasted", ToastAndroid.SHORT);
  };

  const handlePlay = () => {
    if (video != "undefined") {
      navigation.navigate("PlayerScreen", { video });
    }
  };

  const handleDownload = () => {
    if (video != "undefined") {
      Linking.openURL(video);
    }
  };

  const handleInput = (text) => {
    setOriginalLink("");
    setLink(text);
    setAppStart(false);
  };

  const handleMoreVideo = () => {
    if (!socials) return;

    Linking.openURL(socials.telegram_channel);
  };

  const interstitial = async () => {
    if (admobCode.interstitial_video) {
      await AdMobRewarded.setAdUnitID(admobCode.interstitial_video);
      try {
        await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
        await AdMobRewarded.showAdAsync();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const autoScroll = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      {originalLink.length > 0 && (
        <VideoWebView
          route={route}
          setOriginalLink={setOriginalLink}
          setShowLoading={setShowLoading}
          setVideo={setVideo}
          originalLink={originalLink}
          type={type}
        />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Best Video Downloader</Text>
      </View>

      <ScrollView ref={scrollRef}>
        {admobCode && (
          <View style={{ alignSelf: "center", marginTop: 10 }}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID={admobCode.banner}
              servePersonalizedAds
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Paste Your Link | eg. https://upvideo.to/v/gi6j1imkpp7f/test.mp4&?type4 "
            style={styles.input}
            value={link}
            onChangeText={handleInput}
          />
          <TouchableOpacity
            style={styles.inputBtn}
            activeOpacity={0.9}
            onPress={autoPaste}
          >
            <Ionicons size={23} color="black" name="copy" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnContainer}
          activeOpacity={0.9}
          onPress={handleGetVideo}
        >
          <Ionicons name="play-circle" size={30} color="white" />
          <Text style={styles.btnText}>Get Video</Text>
        </TouchableOpacity>

        {appStart && (
          <View style={styles.playerContainer}>
            {showLoading ? (
              <ActivityIndicator size={60} color="#00ff00" />
            ) : video != "undefined" ? (
              <View style={styles.actionBtnContainer}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.actionBtn, { backgroundColor: "green" }]}
                  onPress={handlePlay}
                >
                  <Ionicons
                    name="play-circle-outline"
                    color="white"
                    size={26}
                  />
                  <Text style={styles.actionBtnText}>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.actionBtn, { backgroundColor: "blue" }]}
                  onPress={handleDownload}
                >
                  <Ionicons
                    name="cloud-download-outline"
                    color="white"
                    size={23}
                  />
                  <Text style={styles.actionBtnText}>Download</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.errorText}>
                {"ဇာတ်ကားရှာဖွေမှု အဆင်မပြေပါ"}
              </Text>
            )}
          </View>
        )}

        {admobCode && (
          <View
            style={{ marginBottom: 100, marginTop: 20, alignSelf: "center" }}
          >
            <AdMobBanner
              bannerSize="mediumRectangle"
              adUnitID={admobCode.native}
              servePersonalizedAds
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000f",
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#00000068",
    paddingLeft: 10,
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  headerTitle: { fontWeight: "bold", fontSize: 20, color: "white" },
  inputContainer: {
    width: "95%",
    height: 55,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    marginBottom: 30,
  },
  input: {
    width: "85%",
    height: "100%",
    backgroundColor: "white",
    paddingLeft: 18,
    color: "black",
    letterSpacing: 0.3,
  },
  inputBtn: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderLeftWidth: 0.4,
    borderLeftColor: "grey",
  },
  btnContainer: {
    width: "70%",
    height: 60,
    backgroundColor: "purple",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  btnText: {
    fontWeight: "900",
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
  playerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginTop: 0,
  },
  lottie: {
    width: "65%",
    height: "100%",
    alignSelf: "center",
  },
  actionBtnContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  actionBtn: {
    width: 150,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    flexDirection: "row",
  },
  actionBtnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    marginLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: "white",
    padding: 20,
    backgroundColor: "red",
    borderRadius: 10,
    fontWeight: "bold",
  },
});

export default Home;
