import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import {
  getCommunityMembers,
  makeAdmin,
  removeMember,
} from "../../backend/firebase";
import { List, Button, Chip, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Back from "../Back";

export default function AdminFeed({ route }) {
  const [loading, setLoading] = useState(true);
  const [members, setMembersList] = useState([undefined]);
  const [refreshing, setRefreshing] = useState(true);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setRefreshing(true);
      const data = await getCommunityMembers(route.params.id);
      setMembersList(data);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else if (members.length <= 1) {
    return (
      <View style={styles.container}>
        <Back />
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
        <Back />
        <Text style={styles.header}>Community Members</Text>
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        >
          <List.Section>
            {members &&
              members.map((member) => {
                if (member.id === route.params.userId) {
                } else if (member.admin === true) {
                  return (
                    <List.Item
                      title={member.email}
                      key={member.id}
                      titleStyle={styles.titleStyle}
                      style={styles.listItem}
                      left={() => (
                        <Pressable
                          onPress={async () => {
                            let submit = await removeMember(
                              route.params.id,
                              route.params.name,
                              member.id,
                              member.email,
                              member.admin
                            );
                            if (submit == "success") {
                              // to do
                            }
                          }}
                        >
                          <List.Icon
                            icon="delete-outline"
                            color="#C88D36"
                            style={{ padding: 5 }}
                          />
                        </Pressable>
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
                      titleStyle={styles.titleStyle}
                      style={styles.listItem}
                      right={() => (
                        <Button
                          onPress={async () => {
                            let submit = await makeAdmin(
                              route.params.id,
                              route.params.name,
                              member.id,
                              member.email
                            );
                            if (submit == "success") {
                              // to do
                              setVisible(!visible);
                            }
                          }}
                          textColor="#C88D36"
                        >
                          Make Admin
                        </Button>
                      )}
                      left={() => (
                        <Pressable
                          onPress={async () => {
                            let submit = await removeMember(
                              route.params.id,
                              route.params.name,
                              member.id,
                              member.email,
                              member.admin
                            );
                            if (submit == "success") {
                              // to do
                            }
                          }}
                        >
                          <List.Icon
                            icon="delete-outline"
                            color="#C88D36"
                            style={{ paddingVertical: 9, paddingHorizontal: 5 }}
                          />
                        </Pressable>
                      )}
                    />
                  );
              })}
          </List.Section>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <Snackbar
            style={styles.snackbar}
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: "Dismiss",
              labelStyle: { color: "#C88D36" },
            }}
          >
            <Text style={styles.errorMsg}>Member is now an admin.</Text>
          </Snackbar>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingTop: 95,
    padding: 20,
    height: Dimensions.get("screen").height * 1,
  },
  header: {
    color: "white",
    marginBottom: 10,
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
    marginTop: 15,
    opacity: 0.6,
  },
  listItem: {
    backgroundColor: "#323232",
    borderRadius: 80,
    padding: 15,
    marginBottom: 15,
    minHeight: 70,
    justifyContent: "center",
  },
  titleStyle: {
    color: "white",
    fontSize: 14.5,
    fontFamily: "Montserrat_700Bold",
  },
  snackbar: {
    transform: [{ translateY: 15 }],
  },
  errorMsg: {
    color: "white",
  },
});
