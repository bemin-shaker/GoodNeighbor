import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NearbyCommunities() {
  return (
    <View>
      <Text style={styles.header}>Nearby Communities</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "white",
  },
});
