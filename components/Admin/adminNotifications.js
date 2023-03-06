import * as React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { IconButton, List } from "react-native-paper";
import Back from "../Back";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { getReportedPosts } from "../../backend/firebase";

export default function AdminNotifications({ route }) {
  const [loading, setLoading] = React.useState(true);
  const [postsData, setPostsData] = React.useState([undefined]);
  const [refreshing, setRefreshing] = React.useState(true);

  const navigation = useNavigation();
  const { colors } = useTheme();
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  React.useEffect(() => {
    fetchPostData();
  }, []);

  async function fetchPostData() {
    try {
      setRefreshing(true);
      const data = await getReportedPosts(route.params.id);
      setPostsData(data);
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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Back />
        <Text style={[styles.header, { color: colors.text }]}>
          Notification Feed
        </Text>
        {refreshing ? (
          <ActivityIndicator
            style={{
              backgroundColor: colors.container,
              paddingTop: 40,
              zIndex: 10000,
            }}
            color={colors.tabBarActiveColor}
            size="small"
          />
        ) : null}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchPostData}
              tintColor="transparent"
              colors={["transparent"]}
              style={{ backgroundColor: "transparent" }}
            />
          }
        >
          {postsData.length == 0 ? (
            <View
              style={[
                styles.errMessage,
                { backgroundColor: colors.containerColor },
              ]}
            >
              <IconButton icon="bell-off" size={50} />
              <Text style={[styles.header2, { color: colors.text }]}>
                There are no new notifications at this time.
              </Text>
            </View>
          ) : (
            <List.Section>
              {postsData &&
                postsData.map((post, index) => {
                  if (post.title) {
                    return (
                      <>
                        <Pressable
                          key={index}
                          onPress={() =>
                            navigation.navigate("PostDetails", {
                              postData: post,
                              postId: post.id,
                              communityId: route.params.id,
                              name: route.params.name,
                              admin: route.params.admin,
                            })
                          }
                        >
                          <List.Item
                            title="A user reported a post in your community."
                            description={post.title}
                            descriptionNumberOfLines={1}
                            titleNumberOfLines={2}
                            key={index}
                            titleStyle={[
                              styles.header2,
                              { color: colors.text },
                            ]}
                            descriptionStyle={[
                              {
                                backgroundColor: colors.fabBgColor,
                                padding: 10,
                                marginTop: 10,
                                maxWidth: "95%",
                              },
                              { color: colors.text },
                            ]}
                            style={[
                              styles.listItem,
                              { borderBottomColor: colors.borderBottomColor },
                            ]}
                            left={() => (
                              <List.Icon
                                color={colors.text}
                                style={[
                                  styles.iconLeft,
                                  { backgroundColor: colors.fabBgColor },
                                ]}
                                icon="alert"
                              />
                            )}
                          />
                        </Pressable>
                      </>
                    );
                  }
                })}
            </List.Section>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    paddingLeft: 15,
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
  },
  header2: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  container: {
    paddingTop: 90,
    height: "100%",
  },
  listItem: {
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  iconLeft: {
    borderRadius: 50,
    padding: 10,
    alignSelf: "top",
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
});
