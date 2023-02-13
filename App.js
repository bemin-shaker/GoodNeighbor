import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-native-paper";
import { LogBox } from "react-native";

import Startup from "./components/Startup";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import CommunityFeed from "./components/User/CommunityFeed/CommunityFeed";
import ListItems from "./components/User/CommunityFeed/list";
import PostDetails from "./components/User/CommunityFeed/PostDetails";
import SubmitPost from "./components/User/SubmitPost";
import JoinCommunity from "./components/User/joinCommunity";
import AdminFeed from "./components/Admin/adminFeed";
import AdminNotifications from "./components/Admin/adminNotifications";
import Settings from "./components/User/Settings";
import Notifications from "./components/User/Notifications";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <Provider>
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
            name="Settings"
            component={Settings}
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
          <Stack.Screen
            name="SubmitPost"
            component={SubmitPost}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="JoinCommunity"
            component={JoinCommunity}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AdminFeed"
            component={AdminFeed}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AdminNotifications"
            component={AdminNotifications}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
