import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Map from "./map";
import ListItems from "./list";

export default function CommunityFeed({ route, navigation }) {
  return (
    <View>
      <Map />
      <Text>Community id: {route.params.id}</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Back</Text>
      </Pressable>
      <ListItems communityId={route.params.id} />
    </View>
  );
}

const styles = StyleSheet.create({});
