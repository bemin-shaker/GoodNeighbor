import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { getCommunities } from "../../backend/firebase";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function NearbyCommunities() {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunityData] = useState([undefined]);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    console.log("useEffect has been called");

    async function fetchData() {
      try {
        const data = await getCommunities();
        setCommunityData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.header}>Nearby Communities</Text>
        <List.Section style={{ display: "flex", flexDirection: "row" }}>
          {communities &&
            communities.map((community) => {
              if (community.type === "City") {
                return (
                  <Pressable
                    key={community.id}
                    onPress={() =>
                      navigation.navigate("JoinCommunity", {
                        id: community.id,
                        name: community.name,
                        count: community.members_list.length,
                        type: community.type,
                      })
                    }
                  >
                    <List.Item
                      title={community.name}
                      key={community.id}
                      titleStyle={styles.listTitle}
                      description={community.members_list.length + " Members"}
                      descriptionStyle={styles.listDescription}
                      titleNumberOfLines={3}
                      style={styles.list}
                      right={() => (
                        <List.Icon
                          color={"white"}
                          style={styles.icon}
                          icon="city"
                        />
                      )}
                    />
                  </Pressable>
                );
              } else if (community.type === "University") {
                return (
                  <Pressable
                    key={community.id}
                    onPress={() =>
                      navigation.navigate("JoinCommunity", {
                        id: community.id,
                        name: community.name,
                        count: community.members_list.length,
                        type: community.type,
                      })
                    }
                  >
                    <List.Item
                      title={community.name}
                      key={community.id}
                      description={community.members_list.length + " Members"}
                      descriptionStyle={styles.listDescription}
                      titleStyle={styles.listTitle}
                      titleNumberOfLines={2}
                      style={styles.list}
                      right={() => (
                        <List.Icon
                          color={"white"}
                          style={styles.icon}
                          icon="school"
                        />
                      )}
                    />
                  </Pressable>
                );
              }
            })}
        </List.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: "white",
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
  },
  listTitle: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    wordWrap: "break-word",
  },
  list: {
    backgroundColor: "#323232",
    borderRadius: 30,
    padding: 5,
    marginBottom: 15,
    marginRight: 15,
    // borderWidth: 1,
    // borderColor: "white",
    width: Dimensions.get("window").width / 2.35,
    height: Dimensions.get("window").height / 9,
    overflow: "hidden",
  },
  listDescription: {
    color: "white",
    opacity: 0.5,
    paddingTop: 3,
  },
  icon: {
    position: "absolute",
    borderRadius: 50,
    bottom: 0,
    right: 0,
    transform: [{ scaleX: 5 }, { scaleY: 5 }, { translateY: 4 }],
    opacity: 0.1,
    borderRadius: 90,
  },
});
