import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Map from "./map";

export default function CommunityFeed({ route, navigation }) {
  return (
    <View>
      <Map />
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Community id: {route.params.id}</Text>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
