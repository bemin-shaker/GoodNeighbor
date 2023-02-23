import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
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
  const { colors } = useTheme();
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Back />
      <Text style={[styles.header, { color: colors.text }]}>
        Notification Feed
      </Text>

      <List.Section>
        <List.Item
          title="A user reported a post in your community."
          titleNumberOfLines={2}
          key={1}
          titleStyle={[styles.header2, { color: colors.text }]}
          style={[
            styles.listItem,
            { borderBottomColor: colors.borderBottomColor },
          ]}
          left={() => (
            <List.Icon
              color={colors.text}
              style={[styles.iconLeft, { backgroundColor: colors.fabBgColor }]}
              icon="alert"
            />
          )}
          right={() => <List.Icon color={"#ADADAD"} icon="dots-horizontal" />}
        />
        <List.Item
          title="A user reported a post in your community."
          titleNumberOfLines={2}
          key={2}
          titleStyle={[styles.header2, { color: colors.text }]}
          style={[
            styles.listItem,
            { borderBottomColor: colors.borderBottomColor },
          ]}
          left={() => (
            <List.Icon
              color={colors.text}
              style={[styles.iconLeft, { backgroundColor: colors.fabBgColor }]}
              icon="alert"
            />
          )}
          right={() => <List.Icon color={"#ADADAD"} icon="dots-horizontal" />}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    paddingLeft: 15,
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
  },
  header2: {
    fontSize: 14.5,
    fontFamily: "Montserrat_600SemiBold",
  },
  container: {
    paddingTop: 90,
    height: "100%",
  },
  listItem: {
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  iconLeft: {
    borderRadius: 50,
    padding: 10,
  },
});
