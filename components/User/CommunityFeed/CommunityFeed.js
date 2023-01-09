import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import Map from "./map";
import ListItems from "./list";
import { getPosts } from "../../../backend/firebase";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function CommunityFeed({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState([undefined]);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    console.log("useEffect has been called");

    async function fetchData() {
      try {
        const data = await getPosts(route.params.id);
        setPostsData(data);
        console.log("Hi", postsData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.listView}>
        <Text style={styles.header}>{route.params.name}</Text>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text>Back</Text>
        </Pressable>
        <ListItems
          communityId={route.params.id}
          communityName-={route.params.name}
          posts={postsData}
          isLoading={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
  header: {
    color: "white",
    marginTop: 30,
    marginLeft: 30,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  listView: {
    backgroundColor: "#000000",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    transform: [{ translateY: -40 }],
    zIndex: 1000,
  },
});
