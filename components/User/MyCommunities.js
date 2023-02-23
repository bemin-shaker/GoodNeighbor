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
import { useTheme } from "../../theme/ThemeProvider";
import { Screen } from "../Screen";

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
  const [refreshing, setRefreshing] = React.useState(true);

  const { colors } = useTheme();
  const navigation = useNavigation();

  const activityIndicatorComponent = (
    <ActivityIndicator
      style={{
        backgroundColor: colors.activityIndicatorBgColor,
        paddingTop: 40,
        zIndex: 10000,
      }}
      color={colors.tabBarActiveColor}
      size="small"
    />
  );

  const welcomeCardComponent = (
    <Screen>
      {refreshing ? activityIndicatorComponent : null}
      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchData}
            tintColor="transparent"
            colors={["transparent"]}
            style={{ backgroundColor: "transparent" }}
          />
        }
      >
        <View>
          <View style={styles.errMessage}>
            <Text style={styles.header3}>Welcome to the Neighborhood.</Text>
            <Text style={styles.header2}>Join your first community now.</Text>
            <Image
              style={styles.image}
              source={require("../../assets/friends.jpg")}
            ></Image>
          </View>
          <NearbyCommunities />
        </View>
      </ScrollView>
    </Screen>
  );

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
    return welcomeCardComponent;
  } else {
    return (
      <Screen>
        {refreshing ? activityIndicatorComponent : null}
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchData}
              tintColor="transparent"
              colors={["transparent"]}
              style={{ backgroundColor: "transparent" }}
            />
          }
        >
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={[styles.header, { color: colors.text }]}>
              My Communities
            </Text>
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
                        titleStyle={[
                          {
                            fontSize: 14.5,
                            fontFamily: "Montserrat_700Bold",
                          },
                          { color: colors.text },
                        ]}
                        style={[
                          {
                            borderRadius: 80,
                            padding: 10,
                            marginBottom: 15,
                          },
                          { backgroundColor: colors.containerColor },
                        ]}
                        left={() => (
                          <List.Icon
                            color={colors.listIconColor}
                            style={{
                              backgroundColor: colors.listIconBgColor,
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
                            color={colors.chevronColor}
                          />
                        )}
                      />
                    </Pressable>
                  );
                })}
            </List.Section>
          </View>
          <View>
            <NearbyCommunities />
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 7,
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
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
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 150,
    opacity: 1,
    marginTop: 10,
    borderRadius: 20,
  },
  listContainer: {
    height: Dimensions.get("window").height - 100,
  },
});
