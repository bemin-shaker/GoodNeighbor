import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, MD3Colors } from "react-native-paper";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function NearbyCommunities() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  return (
    <View>
      <Text style={styles.header}>Nearby Communities</Text>
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
