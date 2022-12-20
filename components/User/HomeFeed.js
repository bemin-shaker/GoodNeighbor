import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MyCommunities from "./MyCommunities";
import NearbyCommunities from "./NearbyCommunities";

export default function HomeFeed() {
  return (
    <View style={styles.container}>
      <MyCommunities />
      <NearbyCommunities />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingTop: 60,
    padding: 20,
    height: Dimensions.get("screen").height * 1,
  },
  header: {
    color: "white",
  },
});
