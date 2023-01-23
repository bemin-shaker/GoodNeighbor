import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { getCommunityMembers, makeAdmin } from "../../backend/firebase";
import { List, Button, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function AdminFeed({ route }) {
  const [loading, setLoading] = useState(true);
  const [members, setMembersList] = useState([undefined]);
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
        const data = await getCommunityMembers(route.params.id);
        setMembersList(data);

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
  } else if (members.length <= 1) {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            navigation.navigate("CommunityFeed", {
              id: route.params.id,
              name: route.params.name,
            })
          }
        >
          <Text>Back</Text>
        </Pressable>
        <Text style={styles.header}>Community Members</Text>
        <View style={styles.errMessage}>
          <Text style={styles.header2}>
            Looks like you're the only one in the community.
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            navigation.navigate("CommunityFeed", {
              id: route.params.id,
              name: route.params.name,
            })
          }
        >
          <Text style={{ color: "white" }}>Back</Text>
        </Pressable>
        <Text style={styles.header}>Community Members</Text>
        <ScrollView>
          <List.Section>
            {members &&
              members.map((member) => {
                if (
                  member.id === route.params.userId ||
                  member.admin === true
                ) {
                  return (
                    <List.Item
                      title={member.email}
                      key={member.id}
                      titleStyle={{
                        color: "white",
                        fontSize: 14.5,
                        fontFamily: "Montserrat_700Bold",
                      }}
                      style={{
                        backgroundColor: "#323232",
                        borderRadius: 80,
                        padding: 15,
                        marginBottom: 15,
                        minHeight: 70,
                        justifyContent: "center",
                      }}
                      left={() => (
                        <List.Icon icon="delete-outline" color="#C88D36" />
                      )}
                      right={() => (
                        <Chip
                          style={{
                            backgroundColor: "#C88D36",
                            borderRadius: 80,
                          }}
                        >
                          Admin
                        </Chip>
                      )}
                    />
                  );
                } else
                  return (
                    <List.Item
                      title={member.email}
                      key={member.id}
                      titleStyle={{
                        color: "white",
                        fontSize: 14.5,
                        fontFamily: "Montserrat_700Bold",
                      }}
                      style={{
                        backgroundColor: "#323232",
                        borderRadius: 80,
                        padding: 10,
                        marginBottom: 15,
                        minHeight: 70,
                        justifyContent: "center",
                      }}
                      right={() => (
                        <Button
                          onPress={async () => {
                            let submit = await makeAdmin(
                              route.params.id,
                              member.id,
                              member.email
                            );
                            if (submit == "success") {
                              navigation.navigate("CommunityFeed", {
                                id: route.params.id,
                                name: route.params.name,
                              });
                            }
                          }}
                          textColor="#C88D36"
                        >
                          Make Admin
                        </Button>
                      )}
                      left={() => (
                        <List.Icon icon="delete-outline" color="#C88D36" />
                      )}
                    />
                  );
              })}
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingTop: 60,
    padding: 20,
    height: Dimensions.get("screen").height * 1,
  },
  header: {
    color: "white",
    marginBottom: 10,
    fontSize: 15,
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
    marginTop: 15,
    opacity: 0.6,
  },
});
