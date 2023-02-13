import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { List } from "react-native-paper";
import { logOut } from "../../backend/firebase";
import { useNavigation } from "@react-navigation/native";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export default function HomeFeed() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>Account Settings</Text>
      </View>
      <List.Section>
        <List.Item
          title="Profile Information"
          titleNumberOfLines={2}
          key={1}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={styles.iconLeft}
              icon="account-outline"
            />
          )}
        />
        <List.Item
          title="Privacy"
          titleNumberOfLines={2}
          key={2}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={styles.iconLeft}
              icon="shield-account-outline"
            />
          )}
          onPress={() => console.log("pressed")}
        />
        <List.Item
          title="Change Password"
          titleNumberOfLines={2}
          key={2}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={styles.iconLeft}
              icon="lock-outline"
            />
          )}
        />
        <List.Item
          title="Push Notifications"
          titleNumberOfLines={2}
          key={2}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={styles.iconLeft}
              icon="bell-outline"
            />
          )}
        />
        <List.Item
          title="Privacy Policy"
          titleNumberOfLines={2}
          key={2}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={styles.iconLeft}
              icon="eye-off-outline"
            />
          )}
        />
        <List.Item
          title="Sign Out"
          titleNumberOfLines={2}
          key={2}
          titleStyle={styles.header2}
          style={styles.listItem}
          onPress={async () => {
            await logOut();
            navigation.navigate("Startup");
          }}
          left={() => (
            <List.Icon
              color={"#323232"}
              style={styles.iconLeft}
              icon="logout-variant"
            />
          )}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingTop: 60,
    height: Dimensions.get("screen").height * 1,
  },
  boldText: {
    fontSize: 24,
    paddingLeft: 15,
    marginTop: 10,
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  listItem: {
    borderBottomColor: "#323232",
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconLeft: {
    backgroundColor: "#F5F5F9",
    borderRadius: 50,
    padding: 10,
  },
  header2: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
});
