import * as React from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";

export default function SubmitPost() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Submit Post</Text>
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
