import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Map from "./map";
import ListItems from "./list";
import { getPosts, getUser, getEmail } from "../../../backend/firebase";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Back from "../../Back";

export default function CommunityFeed({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState([undefined]);
  const [userData, setUserData] = useState([undefined]);
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    console.log("useEffect has been called");

    async function fetchData() {
      try {
        const email = await getEmail();
        const data = await getUser(email);
        setUserId(data[0]["id"]);
        const community = data[0]["joined_communities"].find(
          (community) => community.communityId === route.params.id
        );
        setUserData(community);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Back />
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

          {userData && userData.admin == true ? (
            <FAB
              icon="cog"
              color="white"
              style={styles.fab}
              onPress={() =>
                navigation.navigate("AdminFeed", {
                  id: route.params.id,
                  name: route.params.name,
                  userId: userId,
                })
              }
            />
          ) : (
            <></>
          )}
        </View>
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
    paddingBottom: 10,
  },
  fab: {
    backgroundColor: "#262626",
    marginTop: 20,
    // marginRight: 20,
    borderRadius: 50,
  },
});
