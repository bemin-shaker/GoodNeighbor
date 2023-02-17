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
        <Text style={[styles.header, { color: colors.text }]}>
          Nearby Communities
        </Text>
        <List.Section
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
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
                    })
                  }
                >
                  <List.Item
                    title={community.name}
                    key={community.id}
                    description={community.members_list.length + " Members"}
                    descriptionStyle={[
                      styles.listDescription,
                      { color: colors.text },
                    ]}
                    titleStyle={[styles.listTitle, { color: colors.text }]}
                    titleNumberOfLines={2}
                    style={[
                      styles.list,
                      { backgroundColor: colors.containerColor },
                    ]}
                  />
                </Pressable>
              );
            })}
        </List.Section>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  listTitle: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    wordWrap: "break-word",
  },
  list: {
    borderRadius: 30,
    padding: 5,
    marginBottom: 12,
    width: Dimensions.get("window").width / 2.22,
    height: Dimensions.get("window").height / 9,
    overflow: "hidden",
  },
  listDescription: {
    opacity: 0.5,
    paddingTop: 3,
  },
});
