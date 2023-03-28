import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { WebView } from "react-native-webview";
import { lightColors, darkColors } from "../../theme/colorThemes";

import { Screen } from "../Screen";
import { getEmail, getUser } from "../../backend/firebase";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function VerifyIntro({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(true);
  const [stripeSessionUrl, setStripeSessionUrl] = React.useState(null);
  const { colors, isDark } = useTheme();
  const [name, setName] = React.useState("Bemin");

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/create-verification-session/123",
        {
          method: "POST",
        }
      );
      const session = await response.json();
      setStripeSessionUrl(session.url);
      console.log(session);
      console.log(stripeSessionUrl);
      setRefreshing(true);
      const email = await getEmail();
      const data = await getUser(email);
      setName(data[0]["full_name"]);
      console.log(name);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Screen>
      <View style={[styles.container, { backgroundColor: colors.homeHeader }]}>
        <View style={[styles.header, { backgroundColor: colors.homeHeader }]}>
          <View>
            <Text style={[styles.subText, { color: colors.headerText }]}>
              Hi, {name.split(" ")[0]}
            </Text>
            <Text style={[styles.boldText, { color: colors.headerText }]}>
              Verify Your Identity To Continue
            </Text>
            <Pressable
              style={styles.signupButton}
              onPress={async () => {
                navigation.navigate("Verify");
              }}
            >
              <Text style={styles.signupButtonText}>Verify</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  subText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  boldText: {
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },

  signupButton: {
    borderColor: lightColors.tabBarActiveColor,
    borderWidth: 1.5,
    backgroundColor: lightColors.tabBarActiveColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 15,
    marginTop: 35,
    marginLeft: 10,
  },
  signupButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
});
