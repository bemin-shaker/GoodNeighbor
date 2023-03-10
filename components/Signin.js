import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { TextInput, Snackbar, Button } from "react-native-paper";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { logInWithEmail } from "../backend/firebase";
import { lightColors, darkColors } from "../theme/colorThemes";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.headerTextSmall}>
            Welcome back, you've been missed!
          </Text>
          <View style={styles.curve}>
            <View style={styles.signupForm}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                activeUnderlineColor="#C88D36"
                inputMode="email"
                underlineColor={lightColors.tabBarActiveColor}
                textColor="black"
                label="Email"
                left={<TextInput.Icon icon="email-outline" />}
                onChangeText={(email) => setEmail(email)}
                placeholder="example@website.com"
              />
              <View>
                <TextInput
                  inputMode="text"
                  style={styles.textInput}
                  activeUnderlineColor="#C88D36"
                  underlineColor={lightColors.tabBarActiveColor}
                  textColor="black"
                  label="Password"
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock-outline" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye" : "eye-off"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  onChangeText={(text) => setPassword(text)}
                  placeholder="********"
                />
              </View>

              <Pressable
                style={styles.signupButton}
                onPress={async () => {
                  let result = await logInWithEmail(email, password);
                  if (result === "success") {
                    navigation.navigate("Home");
                  } else {
                    {
                      setVisible(!visible);
                    }
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
                <Text style={styles.errorMsg}>Invalid Login Credentials</Text>
              </Snackbar>
            </View>
          </View>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.tabBarActiveColor,
    height: Dimensions.get("screen").height,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  textInput: {
    width: Dimensions.get("screen").width * 0.8,
    marginBottom: 10,
    color: "black",
    backgroundColor: "transparent",
    opacity: 1,
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
    marginTop: 30,
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
    backgroundColor: lightColors.background,
    width: Dimensions.get("screen").width * 1,
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    overflow: "hidden",
    marginTop: 80,
    paddingTop: 10,
  },
  headerText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 80,
  },
  headerTextSmall: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  signupForm: {
    alignItems: "center",
    paddingTop: 30,
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
