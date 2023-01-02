import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Startup from "./components/Startup";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import CommunityFeed from "./components/User/CommunityFeed/CommunityFeed";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Startup"
          component={Startup}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#212121",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#212121",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CommunityFeed"
          component={CommunityFeed}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
