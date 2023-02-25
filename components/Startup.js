import React from "react";
import {
  View,
  StatusBar,
  Pressable,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { lightColors, darkColors } from "../theme/colorThemes";

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
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
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
    backgroundColor: lightColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  curve: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightColors.tabBarActiveColor,
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    transform: [{ scaleX: 2 }],
    overflow: "hidden",
  },
  fixToText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: lightColors.background,
  },
  lightText: {
    fontFamily: "Montserrat_400Regular",
  },
  boldText: {
    fontSize: 42,
    color: lightColors.background,
    transform: [{ scaleX: 0.5 }],
    paddingBottom: 60,
    fontFamily: "Montserrat_700Bold",
  },
  loginButton: {
    borderColor: lightColors.tabBarActiveColor,
    borderWidth: 2,
    backgroundColor: "#003366",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 15,
    marginTop: 65,
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  signupButton: {
    borderColor: lightColors.tabBarActiveColor,
    borderWidth: 1.5,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 70,
  },
  signupButtonText: {
    color: "#003366",
    fontSize: 17,
    textAlign: "center",
  },
});
