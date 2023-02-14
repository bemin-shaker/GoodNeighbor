import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

import MyCommunities from "./MyCommunities";

import NearbyCommunities from "./NearbyCommunities";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function HomeFeed({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.boldText}>
            Good
            <Text style={styles.lightText}>Neighbor</Text>
          </Text>
        </View>

        <FAB
          icon="bell-badge-outline"
          color="white"
          style={styles.fab}
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>

      <MyCommunities />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingTop: 60,
    padding: 15,
    height: Dimensions.get("screen").height * 1,
  },

  lightText: {
    fontFamily: "Montserrat_400Regular",
  },
  boldText: {
    fontSize: 25,
    marginTop: 10,
    color: "white",
    fontFamily: "Montserrat_700Bold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  fab: {
    backgroundColor: "#212121",
    borderRadius: 50,
  },
});
