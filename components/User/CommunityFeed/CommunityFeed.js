import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Map from "./map";
import ListItems from "./list";
import { getPosts } from "../../../backend/firebase";

export default function CommunityFeed({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState([undefined]);

  useEffect(() => {
    console.log("useEffect has been called");

    async function fetchData() {
      try {
        const data = await getPosts(route.params.id);
        setPostsData(data);
        console.log(postsData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <Map />
      <Text>Community id: {route.params.id}</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Back</Text>
      </Pressable>
      <ListItems
        communityId={route.params.id}
        posts={postsData}
        isLoading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
