import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Map from "./map";

export default function CommunityFeed() {
  const navigation = useNavigation();

  return (
    <View>
      <Map />
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
