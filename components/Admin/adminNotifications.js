import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Ionicons";
import { List } from "react-native-paper";
import Back from "../Back";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

export default function AdminNotifications() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  return (
    <View style={styles.container}>
      <Back />
      <Text style={styles.header}>Notifications</Text>

      <List.Section>
        <List.Item
          title="A user reported a post in your community."
          titleNumberOfLines={2}
          key={1}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon color={"#323232"} style={styles.iconLeft} icon="alert" />
          )}
          right={() => <List.Icon color={"#ADADAD"} icon="dots-horizontal" />}
        />
        <List.Item
          title="A user reported a post in your community."
          titleNumberOfLines={2}
          key={2}
          titleStyle={styles.header2}
          style={styles.listItem}
          left={() => (
            <List.Icon color={"#323232"} style={styles.iconLeft} icon="alert" />
          )}
          right={() => <List.Icon color={"#ADADAD"} icon="dots-horizontal" />}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "white",
    marginBottom: 5,
    paddingLeft: 15,
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  header2: {
    color: "white",
    fontSize: 14.5,
    fontFamily: "Montserrat_700Bold",
  },
  container: {
    paddingTop: 90,

    backgroundColor: "black",
    height: "100%",
  },
  listItem: {
    //  backgroundColor: "#323232",
    borderBottomColor: "#323232",
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  iconLeft: {
    backgroundColor: "#F5F5F9",
    borderRadius: 50,
    padding: 15,
  },
});
