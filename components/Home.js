import * as React from "react";
import { StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeFeed from "./User/HomeFeed";
import Settings from "./User/Settings";

const Tab = createBottomTabNavigator();

export default function Home() {
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
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#C88D36",
          tabBarInactiveTintColor: "gray",
          tabBarActiveBackgroundColor: "black",
          tabBarInactiveBackgroundColor: "black",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "black",
          },
        })}
      >
        <Tab.Screen name="Feed" component={HomeFeed} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    height: Dimensions.get("screen").height * 1,
    backgroundColor: "#000000",
  },
});
