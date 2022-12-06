import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

const Setting = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>More About Us</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>How to use</Text>
          <TouchableOpacity
            style={styles.about}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("PrivacyAndPolicyScreen");
            }}
          >
            <Ionicons name="settings" color="white" size={25} />
            <Text style={styles.aboutText}>How to use</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;

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
  },
  headerTitle: { fontWeight: "bold", fontSize: 20, color: "white" },
  logoContainer: {
    width: "100%",
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  aboutContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  aboutTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "red",
  },
  about: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
  aboutText: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginLeft: 10,
  },
});
