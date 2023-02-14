import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import NearbyCommunities from "./NearbyCommunities";

import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { getUser, getEmail } from "../../backend/firebase";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MyCommunities() {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunityData] = useState([undefined]);
  const [name, setName] = useState(" to the Neighborhood.");
  const [refreshing, setRefreshing] = React.useState(true);

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  async function fetchData() {
    try {
      setRefreshing(true);
      const email = await getEmail();
      const data = await getUser(email);
      setCommunityData(data[0]["joined_communities"]);
      setName(data[0]["full_name"]);

      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
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
      <>
        {refreshing ? (
          <ActivityIndicator
            style={{
              backgroundColor: "black",
              padding: 20,
              zIndex: 10000,
            }}
            color="#C88D36"
            size="small"
          />
        ) : null}
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        >
          <View style={styles.errMessage}>
            <Text style={styles.header3}>Welcome to the Neighborhood.</Text>
            <Text style={styles.header2}>Join your first community now.</Text>
            <Image
              style={styles.image}
              source={require("../../assets/friends.jpg")}
            ></Image>
          </View>
          <NearbyCommunities />
        </ScrollView>
      </>
    );
  } else {
    return (
      <View>
        <Text style={styles.header}>My Communities</Text>
        {refreshing ? (
          <ActivityIndicator
            style={{
              backgroundColor: "black",
              padding: 20,
              zIndex: 10000,
            }}
            color="#C88D36"
            size="small"
          />
        ) : null}
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        >
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
                      right={() => (
                        <Icon
                          name="chevron-forward-outline"
                          style={{
                            alignSelf: "center",
                          }}
                          size={28}
                          color="white"
                        />
                      )}
                    />
                  </Pressable>
                );
              })}
          </List.Section>
          <NearbyCommunities />
        </ScrollView>
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
    fontSize: 20,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_400Regular",
  },
  header3: {
    color: "white",
    fontSize: 22,
    paddingHorizontal: 15,
    paddingTop: 5,
    fontFamily: "Montserrat_700Bold",
  },
  errMessage: {
    backgroundColor: "#a3c3f2",
    paddingTop: 10,
    opacity: 0.9,
    marginBottom: 30,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 150,
    // borderRadius: 400,
    opacity: 1,
    marginTop: 10,
    borderRadius: 20,
  },
  listContainer: {
    height: Dimensions.get("window").height - 200,
  },
});
