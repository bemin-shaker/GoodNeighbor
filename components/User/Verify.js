import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { WebView } from "react-native-webview";
import { lightColors } from "../../theme/colorThemes";
import { Screen } from "../Screen";
import { getEmail, getUser } from "../../backend/firebase";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Verify({ navigation }) {
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
      setRefreshing(true);
      const email = await getEmail();
      const data = await getUser(email);
      setName(data[0]["full_name"]);
      const response = await fetch(
        `http://localhost:3000/api/create-verification-session/${data[0]["id"]}`,
        {
          method: "POST",
        }
      );

      const session = await response.json();
      setStripeSessionUrl(session.url);

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
        <Pressable
          style={styles.signupButton}
          onPress={async () => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.signupButtonText}>
            Continue to Home {"  "}
            {">"}
          </Text>
        </Pressable>
        <View style={[styles.header, { backgroundColor: colors.homeHeader }]}>
          <WebView source={{ uri: stripeSessionUrl }} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  subText: {
    fontFamily: "Montserrat_400Regular",
    color: "#00478d",
    fontSize: 20,
    textAlign: "center",
  },
  boldText: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    height: "100%",
  },
  fab: {
    borderRadius: 50,
    shadowRadius: 0,
  },

  signupButton: {
    // borderColor: lightColors.tabBarActiveColor,
    // borderWidth: 1.5,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 15,
    marginLeft: 10,
  },
  signupButtonText: {
    color: lightColors.tabBarActiveColor,
    fontSize: 17,
    textAlign: "center",
  },
});
