import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Startup from "./components/Startup";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import CommunityFeed from "./components/User/CommunityFeed/CommunityFeed";
import ListItems from "./components/User/CommunityFeed/list";
import PostDetails from "./components/User/CommunityFeed/PostDetails";

const Stack = createNativeStackNavigator();

/* TO DO:
1. Add a check to see if a user is logged in, if so, redirect to Home
2. After signing up, have user go through identity verification process
*/

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
        <Stack.Screen
          name="ListItems"
          component={ListItems}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
