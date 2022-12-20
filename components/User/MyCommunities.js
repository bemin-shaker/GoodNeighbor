import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyCommunities() {
  return (
    <View>
      <Text style={styles.header}>My Communities</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "white",
  },
});
