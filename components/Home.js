import * as React from "react";
import { StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeFeed from "./User/HomeFeed";
import SubmitPost from "./User/SubmitPost";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Submit") {
              iconName = "ios-add";
            }

            // You can return any component that you like here!
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
        <Tab.Screen name="Home" component={HomeFeed} />
        <Tab.Screen name="Submit" component={SubmitPost} />
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
