import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PostDetails() {
  return (
    <View>
      <Text style={styles.header}>Post Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "white",
  },
});
