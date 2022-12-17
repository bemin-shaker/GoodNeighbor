import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Pressable,
  Button,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Startup({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.curve}>
        <Text style={styles.boldText}>
          Good
          <Text style={styles.lightText}>Neighbor</Text>
        </Text>
      </View>
      <View style={styles.fixToText}>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.signupButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  curve: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212121",
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    transform: [{ scaleX: 2 }],
    overflow: "hidden",
  },
  fixToText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  lightText: {
    fontFamily: "Montserrat_400Regular",
  },
  boldText: {
    fontSize: 40,
    color: "white",
    transform: [{ scaleX: 0.5 }],
    fontFamily: "Montserrat_700Bold",
  },
  loginButton: {
    backgroundColor: "#C88D36",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 65,
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#262626",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 15,
    marginBottom: 60,
  },
  signupButtonText: {
    color: "#C88D36",
    fontSize: 17,
    textAlign: "center",
  },
});
