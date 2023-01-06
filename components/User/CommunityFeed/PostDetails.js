import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PostDetails({ route, navigation }) {
  return (
    <View>
      <Text style={styles.header}>Post Details</Text>
      <Pressable
        onPress={() =>
          navigation.navigate("CommunityFeed", { id: route.params.id })
        }
      >
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
  },
});
