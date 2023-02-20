import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Chip } from "react-native-paper";
import { joinCommunity, getEmail, getUser } from "../../backend/firebase";
import Back from "../Back";
import { useTheme } from "../../theme/ThemeProvider";

export default function JoinCommunity({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  const { colors, isDark } = useTheme();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Back />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.lightText, { color: colors.text }]}>
            This is
          </Text>
          <Text style={[styles.boldText, { color: colors.text }]}>
            {route.params.name}
          </Text>
          <View style={styles.flexCont}>
            <Chip
              textStyle={[styles.chipText, { color: colors.fabColor }]}
              style={[styles.chip, { backgroundColor: colors.fabBgColor }]}
            >
              {route.params.count} Members
            </Chip>
            <Chip
              textStyle={[styles.chipText, { color: colors.fabColor }]}
              style={[styles.chip, { backgroundColor: colors.fabBgColor }]}
            >
              {route.params.type}
            </Chip>
          </View>
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/city.jpg")}
        ></Image>

        <Pressable
          style={styles.loginButton}
          onPress={async () => {
            let usersEmail = await getEmail();
            let usersId = await getUser(usersEmail);
            let submit = await joinCommunity(
              usersEmail,
              route.params.id,
              route.params.name,
              usersId[0].id
            );
            if (submit == "success") {
              navigation.navigate("CommunityFeed", {
                id: route.params.id,
                name: route.params.name,
              });
            }
          }}
        >
          <Text style={styles.loginButtonText}>Join Community</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    padding: 20,
    display: "flex",
    flex: 1,
    alignItems: "center",
    width: "100%",
  },

  lightText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
    marginTop: 20,
  },
  chip: {
    backgroundColor: "#323232",
    borderRadius: 25,
    marginHorizontal: 4,
    color: "white",
    opacity: 0.8,
    maxHeight: 40,
    marginTop: 15,
  },
  flexCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  chipText: {
    color: "white",
    fontFamily: "Montserrat_400Regular",
    color: "#DADADA",
    fontSize: 14,
  },
  boldText: {
    fontSize: 26,
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#C88D36",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 15,
    marginTop: 50,
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  image: {
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.25,
    borderRadius: 400,
    opacity: 1,
    marginTop: 45,
  },
});
