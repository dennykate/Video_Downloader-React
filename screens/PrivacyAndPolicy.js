import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const PrivacyAndPolicy = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>How to use</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ marginTop: 5, color: "white" }}>
            1. Copy link from my telegram channel
          </Text>
          <Text style={{ marginTop: 5, color: "white" }}>
            2. Paste in white box
          </Text>
          <Text style={{ marginTop: 5, color: "white" }}>
            3. Click the submit icon
          </Text>
          <Text style={{ marginTop: 5, color: "white" }}>
            4. Wait for a while
          </Text>
          <Text style={{ marginTop: 5, color: "white" }}>
            5. After waiting, you can play and download
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyAndPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000f",
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "black",
    paddingLeft: 10,
  },
  headerTitle: { fontWeight: "bold", fontSize: 20, color: "white" },
  textContainer: {
    margin: 10,
    marginTop: 30,
  },
});
