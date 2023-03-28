import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButton, List, Chip, FAB } from "react-native-paper";
import { Screen } from "../Screen";
import { useTheme } from "../../theme/ThemeProvider";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import {
  getSubscribedNotifications,
  deleteNotification,
} from "../../backend/firebase";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notif, setNotifList] = useState([undefined]);
  const [refreshing, setRefreshing] = useState(true);

  const navigation = useNavigation();
  const { colors } = useTheme();
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
      const data = await getSubscribedNotifications();
      setNotifList(data);
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
  } else {
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.headerFlex}>
            <View>
              <Text style={[styles.header, { color: colors.text }]}>
                Notifications
              </Text>
            </View>

            <FAB
              icon="cog-outline"
              size="small"
              color={colors.fabColor}
              style={[styles.fab, { backgroundColor: colors.fabBgColor }]}
              onPress={() => navigation.navigate("HomeFeed")}
            />
          </View>
          {refreshing ? (
            <ActivityIndicator
              style={{
                backgroundColor: colors.activityIndicatorBgColor,
                padding: 20,
                zIndex: 10000,
              }}
              color="#C88D36"
              size="small"
            />
          ) : null}
          <ScrollView
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
            {notif.length === 0 ? (
              <View
                style={[
                  styles.errMessage,
                  { backgroundColor: colors.containerColor },
                ]}
              >
                <IconButton icon="bell-off" size={50} />
                <Text style={[styles.errText, { color: colors.text }]}>
                  There are no new notifications at this time.
                </Text>
              </View>
            ) : (
              <List.Section>
                {notif &&
                  notif.map((post, index) => {
                    if (post.title) {
                      return (
                        <>
                          <List.Item
                            title={post.title}
                            titleNumberOfLines={1}
                            key={1}
                            titleStyle={[
                              styles.header2,
                              { color: colors.text },
                            ]}
                            description={post.body}
                            descriptionStyle={[
                              styles.header3,
                              { color: colors.text },
                            ]}
                            descriptionNumberOfLines={2}
                            style={styles.listItem}
                            right={() => (
                              <IconButton
                                icon="delete-outline"
                                size={25}
                                color={colors.text}
                                onPress={async () =>
                                  await deleteNotification(post)
                                }
                              />
                            )}
                          ></List.Item>
                          <View
                            style={[
                              styles.listFooter,
                              { borderBottomColor: colors.borderBottomColor },
                            ]}
                          >
                            <Chip
                              icon={() => (
                                <Icon
                                  name="clock"
                                  size={16}
                                  color={colors.text}
                                />
                              )}
                              textStyle={{ color: colors.text }}
                              style={styles.chip}
                              onPress={() => console.log("Pressed")}
                            >
                              Feb 13, 2022
                            </Chip>
                            <Chip
                              textStyle={{ color: colors.text }}
                              onPress={() => console.log("Pressed")}
                              style={styles.chip}
                            >
                              Hoboken
                            </Chip>
                          </View>
                        </>
                      );
                    }
                  })}
              </List.Section>
            )}
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // marginVertical: 12,
    paddingLeft: 15,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  header2: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
  },
  header3: {
    fontFamily: "Montserrat_400Regular",
    opacity: 0.8,
    paddingTop: 8,
    fontSize: 15.5,
    lineHeight: 23,
  },
  chip: {
    backgroundColor: "transparent",
    marginLeft: 8,
    color: "white",
    opacity: 0.4,
  },
  container: {
    paddingTop: 55,
    height: "100%",
  },
  listItem: {
    marginBottom: 0,
    paddingRight: 30,
  },
  listFooter: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingBottom: 6,
  },
  headerFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#212121",
    borderRadius: 50,
    marginRight: 15,
  },
  errMessage: {
    display: "flex",
    alignItems: "center",
    opacity: 0.7,
    borderRadius: 5,
    marginHorizontal: 15,
    padding: 20,
    marginTop: 10,
    paddingBottom: 40,
  },
  errText: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
});
