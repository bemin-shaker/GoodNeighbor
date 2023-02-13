import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { getUser, getEmail } from "../../backend/firebase";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function MyCommunities() {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunityData] = useState([undefined]);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  useEffect(() => {
    console.log("useEffect has been called");

    async function fetchData() {
      try {
        const email = await getEmail();
        const data = await getUser(email);
        setCommunityData(data[0]["joined_communities"]);

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
  } else if (communities.length === 0) {
    return (
      <View style={styles.errMessage}>
        <Text style={styles.header2}>Join your first community now.</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.header}>My Communities</Text>

        <List.Section>
          {communities &&
            communities.map((community) => {
              return (
                <Pressable
                  key={community.communityId}
                  onPress={() =>
                    navigation.navigate("CommunityFeed", {
                      id: community.communityId,
                      name: community.communityName,
                    })
                  }
                >
                  <List.Item
                    title={community.communityName}
                    key={community.communityId}
                    titleStyle={{
                      color: "white",
                      fontSize: 14.5,
                      fontFamily: "Montserrat_700Bold",
                    }}
                    style={{
                      backgroundColor: "#212121",
                      borderRadius: 80,
                      padding: 10,
                      marginBottom: 15,
                    }}
                    left={() => (
                      <List.Icon
                        color={"#212121"}
                        style={{
                          backgroundColor: "#F5F5F9",
                          borderRadius: 50,
                          padding: 7,
                        }}
                        icon="city"
                      />
                    )}
                  />
                </Pressable>
              );
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
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  header2: {
    color: "white",
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "Montserrat_400Regular",
  },
  errMessage: {
    backgroundColor: "#323232",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    opacity: 0.6,
  },
});
