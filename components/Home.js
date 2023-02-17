import * as React from "react";
import { StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeFeed from "./User/HomeFeed";
import Settings from "./User/Settings";
import { useTheme } from "../theme/ThemeProvider";

import Notifications from "./User/Notifications";
const Tab = createBottomTabNavigator();

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Feed") {
              iconName = "ios-home";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            } else if (route.name === "Notifications") {
              iconName = "notifications-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.tabBarActiveColor,
          tabBarInactiveTintColor: "gray",
          tabBarActiveBackgroundColor: colors.tabBarBgColor,
          tabBarInactiveBackgroundColor: colors.tabBarBgColor,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.tabBarBgColor,
          },
        })}
      >
        <Tab.Screen name="Feed" component={HomeFeed} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    height: "100%",
    backgroundColor: "#000000",
  },
});
