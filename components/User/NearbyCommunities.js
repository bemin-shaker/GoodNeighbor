import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { getCommunities } from "../../backend/firebase";
import { List, Card, IconButton, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { Screen } from "../Screen";

export default function NearbyCommunities() {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunityData] = useState([undefined]);
  const navigation = useNavigation();
  const { colors } = useTheme();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
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
  } else if (communities.length === 0) {
    return <View></View>;
  } else {
    return (
      <Screen>
        <Text style={[styles.header, { color: colors.text }]}>Nearby</Text>

        <ScrollView
          horizontal
          disableIntervalMomentum={true}
          snapToInterval={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 15, height: "100%" }}
        >
          {communities &&
            communities.map((community) => {
              return (
                <Pressable
                  key={community.id}
                  onPress={() =>
                    navigation.navigate("JoinCommunity", {
                      id: community.id,
                      name: community.name,
                      count: community.members_list.length,
                      type: community.type,
                      coverURL: community.coverURL,
                    })
                  }
                >
                  <Card
                    style={[
                      styles.list,
                      { backgroundColor: colors.containerColor },
                    ]}
                  >
                    <Card.Cover
                      style={{
                        borderRadius: 0,
                        transform: [{ scale: 1.1 }],
                        height: Dimensions.get("window").width * 0.35,
                      }}
                      source={{ uri: community.coverURL }}
                    />
                    <Card.Title
                      title={community.name}
                      titleStyle={[styles.listTitle, { color: colors.text }]}
                      titleNumberOfLines={1}
                      subtitle={community.members_list.length + " Members"}
                      subtitleStyle={[
                        styles.listDescription,
                        { color: colors.text },
                      ]}
                      right={(props) => (
                        <Pressable
                          style={[
                            styles.signupButton,
                            { borderColor: colors.tabBarActiveColor },
                          ]}
                          onPress={() =>
                            navigation.navigate("JoinCommunity", {
                              id: community.id,
                              name: community.name,
                              count: community.members_list.length,
                              type: community.type,
                            })
                          }
                        >
                          <Text
                            style={[
                              styles.signupButtonText,
                              { color: colors.tabBarActiveColor },
                            ]}
                          >
                            Join
                          </Text>
                        </Pressable>
                      )}
                    />
                  </Card>
                </Pressable>
              );
            })}

          <Text style={{ opacity: 0 }}>Hiii</Text>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 7,
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    paddingHorizontal: 15,
  },
  listTitle: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    wordWrap: "break-word",
    lineHeight: 20,
    paddingTop: 8,
  },
  list: {
    borderRadius: 30,
    padding: 5,
    marginRight: 15,
    marginTop: 10,
    width: Dimensions.get("window").width / 1.5,
    overflow: "hidden",
  },
  listDescription: {
    opacity: 0.5,
    lineHeight: 0,
  },
  signupButton: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
    marginTop: 10,
    marginRight: 5,
  },
  signupButtonText: {
    fontSize: 17,
    textAlign: "center",
  },
});
