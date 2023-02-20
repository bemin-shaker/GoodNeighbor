import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  StatusBar,
} from "react-native";
import { List } from "react-native-paper";
import { logOut } from "../../backend/firebase";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { Screen } from "../Screen";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export default function HomeFeed() {
  const { setScheme, isDark } = useTheme();
  const { colors } = useTheme();

  const toggleScheme = () => {
    isDark ? setScheme("light") : setScheme("dark");
  };
  const text = isDark ? "Dark mode 🌙" : "Light mode 🌞";

  const textStyle = {
    fontSize: 18,
    color: colors.text,
  };

  const listStyle = [
    styles.listItem,
    { borderBottomColor: colors.borderBottomColor },
  ];

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
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.boldText, { color: colors.text }]}>
            Account Settings
          </Text>
        </View>
        <List.Section>
          <List.Item
            title="Profile Information"
            titleNumberOfLines={2}
            key={1}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="account-outline"
              />
            )}
          />
          <List.Item
            title="Privacy"
            titleNumberOfLines={2}
            key={2}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="shield-account-outline"
              />
            )}
            onPress={() => console.log("pressed")}
          />
          <List.Item
            title="Change Password"
            titleNumberOfLines={2}
            key={2}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="lock-outline"
              />
            )}
          />
          <List.Item
            title="Push Notifications"
            titleNumberOfLines={2}
            key={2}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="bell-outline"
              />
            )}
          />
          <List.Item
            title="Privacy Policy"
            titleNumberOfLines={2}
            key={2}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="eye-off-outline"
              />
            )}
          />
          <List.Item
            title="Sign Out"
            titleNumberOfLines={2}
            key={2}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            onPress={async () => {
              await logOut();
              navigation.navigate("Startup");
            }}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="logout-variant"
              />
            )}
          />
          <List.Item
            title="Appearance"
            description={text}
            titleNumberOfLines={2}
            key={2}
            descriptionStyle={[styles.description, { color: colors.text }]}
            titleStyle={[styles.header2, { color: colors.text }]}
            style={listStyle}
            left={() => (
              <List.Icon
                color={colors.fabColor}
                style={[
                  styles.iconLeft,
                  { backgroundColor: colors.fabBgColor },
                ]}
                icon="palette-outline"
              />
            )}
            right={() => (
              <Switch
                style={{ alignSelf: "center" }}
                value={isDark}
                onValueChange={toggleScheme}
              />
            )}
          />
        </List.Section>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    height: Dimensions.get("screen").height * 1,
  },
  boldText: {
    fontSize: 25,
    paddingLeft: 15,
    marginTop: 3,
    fontFamily: "Montserrat_600SemiBold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  listItem: {
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconLeft: {
    borderRadius: 50,
    padding: 10,
  },
  header2: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
  },
});
