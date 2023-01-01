import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function MyCommunities() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  return (
    <View>
      <Text style={styles.header}>My Communities</Text>

      <List.Section>
        <List.Item
          title="Bayonne"
          titleStyle={{
            color: "white",
            fontSize: 15,
            fontFamily: "Montserrat_700Bold",
          }}
          style={{ backgroundColor: "#323232", padding: 10, marginBottom: 15 }}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={{
                backgroundColor: "#F5F5F9",
                borderRadius: 50,
                padding: 7,
              }}
              icon="city"
            />
          )}
        />
        <List.Item
          title="Stevens Institute of Technology"
          titleStyle={{
            color: "white",
            fontSize: 15,
            fontFamily: "Montserrat_700Bold",
          }}
          style={{ backgroundColor: "#323232", padding: 10, marginBottom: 15 }}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={{
                backgroundColor: "#F5F5F9",
                borderRadius: 50,
                padding: 7,
              }}
              icon="school"
            />
          )}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "white",
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
  },
});
