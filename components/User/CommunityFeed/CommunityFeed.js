import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

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
        // console.log("Hi", postsData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Map
        communityId={route.params.id}
        communityName={route.params.name}
        posts={postsData}
        isLoading={loading}
      />
      <View style={styles.listView}>
        <View style={styles.flexCont}>
          <View>
            <Text style={styles.header}>{route.params.name}</Text>
            <Text style={styles.subHeader}>
              {postsData.length} incidents in the past 24 hours
            </Text>
          </View>

          <FAB
            icon="plus"
            color="white"
            style={styles.fab}
            onPress={() =>
              navigation.navigate("SubmitPost", {
                id: route.params.id,
                name: route.params.name,
              })
            }
          />
        </View>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={{ color: "white" }}>Back</Text>
        </Pressable>

        <ListItems
          communityId={route.params.id}
          communityName={route.params.name}
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
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  subHeader: {
    color: "#FFFFFF",
    marginTop: 4,
    marginLeft: 20,
    opacity: 0.7,
    fontSize: 17,
  },
  listView: {
    backgroundColor: "#000000",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    transform: [{ translateY: -40 }],
    zIndex: 1000,
  },
  flexCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  fab: {
    backgroundColor: "#262626",
    marginTop: 20,
    marginRight: 20,
    borderRadius: 50,
  },
});
