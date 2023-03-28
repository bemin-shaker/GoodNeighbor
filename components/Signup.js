import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { TextInput, Snackbar } from "react-native-paper";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { signUpWithEmail } from "../backend/firebase";
import { lightColors, darkColors } from "../theme/colorThemes";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setfName] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <>
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
              underlineColor={lightColors.tabBarActiveColor}
              textColor="black"
              label="Your Name"
              left={<TextInput.Icon icon="account-outline" />}
              onChangeText={setfName}
            />
            <TextInput
              style={styles.textInput}
              activeUnderlineColor="#C88D36"
              underlineColor={lightColors.tabBarActiveColor}
              textColor="black"
              label="Email"
              left={<TextInput.Icon icon="email-outline" />}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.textInput}
              activeUnderlineColor="#C88D36"
              underlineColor={lightColors.tabBarActiveColor}
              textColor="black"
              label="Password"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              left={<TextInput.Icon icon="lock-outline" />}
              onChangeText={setPassword}
              placeholder="********"
            />

            <Pressable
              style={styles.signupButton}
              onPress={async () => {
                let result = await signUpWithEmail(fName, email, password);
                if (result === "success") {
                  navigation.navigate("VerifyIntro");
                } else {
                  {
                    setVisible(!visible);
                  }
                }
              }}
            >
              <Text style={styles.signupButtonText}>Sign up</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Signin")}>
              <Text style={styles.loginButton}>
                Already have an account?{" "}
                <Text style={styles.loginButtonHighlight}>Login</Text>
              </Text>
            </Pressable>

            <Snackbar
              style={styles.snackbar}
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Dismiss",
                labelStyle: { color: "#C88D36" },
                onPress: () => {
                  // Do something
                },
              }}
            >
              <Text style={styles.errorMsg}>Invalid Credentials</Text>
            </Snackbar>
          </View>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background,
    height: Dimensions.get("screen").height,
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
    borderColor: lightColors.tabBarActiveColor,
    borderWidth: 1.5,
    backgroundColor: lightColors.tabBarActiveColor,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 15,
    marginTop: 35,
  },
  signupButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  loginButton: {
    color: lightColors.tabBarActiveColor,
    fontSize: 17,
    marginTop: 7,
  },
  loginButtonHighlight: {
    color: lightColors.tabBarActiveColor,
    fontWeight: "bold",
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
    paddingTop: 10,
    paddingBottom: 60,
  },
  headerText: {
    transform: [{ scaleX: 0.5 }],
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 20,
  },
  headerTextSmall: {
    fontSize: 16,
    color: "#FFFFFF",
    transform: [{ scaleX: 0.5 }],
  },
  signupForm: {
    alignItems: "center",
    paddingTop: 40,
    height: Dimensions.get("screen").height * 0.7,
  },
  errorMsg: {
    color: "white",
  },
  snackbar: {
    marginBottom: 60,
    backgroundColor: lightColors.tabBarActiveColor,
  },
});
