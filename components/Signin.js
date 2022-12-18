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
import { logInWithEmail } from "../backend/firebase";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.headerTextSmall}>
            Welcome back, you’ve been missed!
          </Text>
          <View style={styles.curve}>
            <View style={styles.signupForm}>
              <TextInput
                style={styles.textInput}
                activeUnderlineColor="#C88D36"
                underlineColor="#DADADA"
                textColor="#DADADA"
                label="Email"
                left={<TextInput.Icon icon="email-outline" />}
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                style={styles.textInput}
                activeUnderlineColor="#C88D36"
                underlineColor="#DADADA"
                textColor="#DADADA"
                label="Password"
                secureTextEntry
                left={<TextInput.Icon icon="lock-outline" />}
                onChangeText={(text) => setPassword(text)}
              />

              <Pressable
                style={styles.signupButton}
                onPress={async () => {
                  let result = await logInWithEmail(email, password);
                  if (result === "success") {
                    navigation.navigate("Home");
                  }
                }}
              >
                <Text style={styles.signupButtonText}>Login</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.loginButton}>
                  Don't have an account?{" "}
                  <Text style={styles.loginButtonHighlight}>Sign up</Text>
                </Text>
              </Pressable>
            </View>
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
    width: Dimensions.get("screen").width * 1,
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    overflow: "hidden",
    marginTop: 80,
    paddingTop: 10,
    paddingBottom: 60,
  },
  headerText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 80,
  },
  headerTextSmall: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  signupForm: {
    alignItems: "center",
    paddingTop: 30,
    height: Dimensions.get("screen").height * 0.7,
  },
});
