import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FAB, ActivityIndicator, MD2Colors } from "react-native-paper";
import MenuComponent from "../../menu";
import Map from "./map";
import ListItems from "./list";
import { getPosts, getUser, getEmail } from "../../../backend/firebase";
import { useTheme } from "../../../theme/ThemeProvider";
import { Screen } from "../../Screen";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Back from "../../Back";
import BottomSheetComp from "../../BottomSheet";

export default function CommunityFeed({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState([undefined]);
  const [userData, setUserData] = useState([undefined]);
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  const { colors } = useTheme();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    fetchPostData();
  }, []);

  async function fetchPostData() {
    try {
      setRefreshing(true);
      const data = await getPosts(route.params.id);
      setPostsData(data);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
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

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          height: "100%",
          backgroundColor: colors.background,
        }}
        animating={true}
        color={"#C88D36"}
        size={"large"}
      />
    );
  } else {
    return (
      <Screen>
        <View style={styles.container}>
          {userData && userData.admin == true ? (
            <>
              <MenuComponent
                navigation={navigation}
                id={route.params.id}
                name={route.params.name}
                userId={userId}
              />
            </>
          ) : (
            <></>
          )}

          <Back />

          <Map
            communityId={route.params.id}
            communityName={route.params.name}
            posts={postsData}
            isLoading={loading}
          />
          <BottomSheetComp
            content={
              <View style={styles.listView}>
                <ListItems
                  communityId={route.params.id}
                  communityName={route.params.name}
                  posts={postsData}
                  isLoading={loading}
                  refreshing={refreshing}
                  fetchPostData={fetchPostData}
                />
              </View>
            }
            header={
              <View style={styles.flexCont}>
                <View>
                  <Text style={[styles.header, { color: colors.text }]}>
                    {route.params.name}
                  </Text>
                  <Text style={[styles.subHeader, { color: colors.text }]}>
                    {postsData.length} incidents in the past 24 hours
                  </Text>
                </View>

                <FAB
                  icon="plus"
                  color={colors.fabColor}
                  size={"small"}
                  style={[styles.fab, { backgroundColor: colors.fabBgColor }]}
                  onPress={() =>
                    navigation.navigate("SubmitPost", {
                      id: route.params.id,
                      name: route.params.name,
                    })
                  }
                />
              </View>
            }
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  subHeader: {
    marginTop: 4,
    marginLeft: 20,
    opacity: 0.7,
    fontSize: 17,
  },
  listView: {
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
    marginTop: 20,
    marginRight: 20,
    borderRadius: 50,
    padding: 2,
    alignSelf: "center",
  },
});
