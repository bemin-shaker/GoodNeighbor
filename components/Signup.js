import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setfName] = useState("");

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.curve}>
            <Text style={styles.headerText}>Sign Up</Text>
            <Text style={styles.headerTextSmall}>
              Create an account to continue
            </Text>
          </View>
          <View style={styles.signupForm}>
            <TextInput
              style={styles.textInput}
              activeUnderlineColor="#C88D36"
              underlineColor="#DADADA"
              textColor="#DADADA"
              label="Your Name"
              left={<TextInput.Icon icon="account-outline" />}
              onChangeText={setfName}
            />
            <TextInput
              style={styles.textInput}
              activeUnderlineColor="#C88D36"
              underlineColor="#DADADA"
              textColor="#DADADA"
              label="Email"
              left={<TextInput.Icon icon="email-outline" />}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.textInput}
              activeUnderlineColor="#C88D36"
              underlineColor="#DADADA"
              textColor="#DADADA"
              label="Password"
              secureTextEntry
              left={<TextInput.Icon icon="lock-outline" />}
              onChangeText={setPassword}
            />

            <Pressable
              style={styles.signupButton}
              onPress={() => navigation.navigate("Home", { firstName: "hi" })}
            >
              <Text style={styles.signupButtonText}>Sign up</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Signin")}>
              <Text style={styles.loginButton}>
                Already have an account?{" "}
                <Text style={styles.loginButtonHighlight}>Login</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  textInput: {
    width: Dimensions.get("screen").width * 0.8,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  signupButton: {
    backgroundColor: "#C88D36",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 35,
  },
  signupButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  loginButton: {
    color: "white",
    fontSize: 17,
    marginTop: 7,
  },
  loginButtonHighlight: {
    color: "#C88D36",
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
    paddingTop: 20,
    paddingBottom: 60,
  },
  headerText: {
    transform: [{ scaleX: 0.5 }],
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 6,
    marginTop: 20,
  },
  headerTextSmall: {
    fontSize: 14,
    color: "#FFFFFF",
    transform: [{ scaleX: 0.5 }],
  },
  signupForm: {
    alignItems: "center",
    paddingTop: 40,
    height: Dimensions.get("screen").height * 0.7,
  },
});
