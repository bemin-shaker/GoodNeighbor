import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { Chip, TextInput, Divider, Provider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEmail, postUpdate, getUpdates } from "../../../backend/firebase";
import Back from "../../Back";
import Popup from "../../Popup";
import { useTheme } from "../../../theme/ThemeProvider";

import PostMenu from "./PostMenu";

export default function PostDetails({ route, navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [postsData, setPostsData] = React.useState([undefined]);
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(true);

  const { colors } = useTheme();

  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  React.useEffect(() => {
    fetchPostData();
  }, []);

  async function fetchPostData() {
    try {
      setRefreshing(true);
      const data = await getUpdates(
        route.params.communityId,
        route.params.postId
      );
      setPostsData(data);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  function returnElapsedTIme(postTime) {
    let hours;
    let seconds = Math.floor(new Date().getTime() / 1000);
    let initialSeconds = postTime;
    let difference = seconds - initialSeconds;
    if (difference <= 60) {
      return "Less than a minute ago";
    } else if (difference < 3600 && difference > 60) {
      hours = Math.floor(difference / 60);
      return hours + " min ago";
    } else {
      hours = Math.floor(difference / 3600);
      if (hours > 24) {
        let days = Math.floor(hours / 24);
        if (days === 1) {
          return "1 day ago";
        } else {
          return days + " days ago";
        }
      } else {
        return hours + " hr ago";
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(null);
      setImage(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <Provider>
        <StatusBar barStyle={"light-content"} />
        <View>
          <Back light={true} />
          <PostMenu
            navigation={navigation}
            postId={route.params.postId}
            communityId={route.params.communityId}
            name={route.params.name}
            userId={route.params.communityId}
            isAdmin={route.params.admin}
            email="hi"
          />

          <Popup
            component={
              <Image
                style={styles.img}
                variant="image"
                source={{
                  uri: route.params.postData.imageUrl,
                }}
              ></Image>
            }
          />
          <View
            style={[
              styles.listView,
              { backgroundColor: colors.containerColor },
            ]}
          >
            <Text
              style={[styles.header, { color: colors.text }]}
              numberOfLines={2}
            >
              {route.params.postData.title}
            </Text>
            <Chip
              icon={() => (
                <Icon name="clock-outline" size={16} color={colors.text} />
              )}
              style={styles.fab}
              textStyle={{
                color: colors.text,
                transform: [{ translateX: -3 }],
              }}
              onPress={() => console.log("Pressed")}
            >
              {returnElapsedTIme(
                route.params.postData.initialTimestamp.seconds
              )}
            </Chip>
            <Text
              style={[styles.subHeader, { color: colors.tabBarActiveColor }]}
            >
              Updates
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
              style={styles.listContainer}
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
              {postsData &&
                postsData.length > 0 &&
                postsData.map((post, index) => {
                  return (
                    <View>
                      <View style={styles.listItem} key={index}>
                        <Chip
                          icon={() => (
                            <Icon
                              name="clock-outline"
                              size={16}
                              color={colors.text}
                            />
                          )}
                          style={styles.fab2}
                          textStyle={{
                            color: colors.text,
                            transform: [{ translateX: -3 }],
                          }}
                        >
                          {returnElapsedTIme(post.timestamp.seconds)}

                          <Text style={{ opacity: 0.7 }}>
                            {" • "}Posted by {post.postedBy["usersEmail"]}
                          </Text>
                        </Chip>
                        <Text
                          style={{
                            color: colors.text,
                            fontFamily: "Montserrat_400Regular",
                            fontSize: 16,
                            marginBottom: 10,
                            margin: 0,
                            marginLeft: 20,
                          }}
                        >
                          {post.title}
                        </Text>
                        {post.imageUrl !== undefined &&
                          post.imageUrl !== "" && (
                            <Popup
                              component={
                                <Image
                                  style={styles.updateImg}
                                  variant="image"
                                  source={{
                                    uri: post.imageUrl,
                                  }}
                                ></Image>
                              }
                            />
                          )}
                      </View>
                      <Divider style={{ opacity: 0.6 }} />
                    </View>
                  );
                })}
              <View style={styles.listItem}>
                <Chip
                  icon={() => (
                    <Icon name="clock-outline" size={16} color={colors.text} />
                  )}
                  style={[
                    styles.fab2,
                    { backgroundColor: colors.backgroundColor },
                  ]}
                  textStyle={{
                    color: colors.text,
                    transform: [{ translateX: -3 }],
                  }}
                  onPress={() => console.log("Pressed")}
                >
                  {returnElapsedTIme(
                    route.params.postData.initialTimestamp.seconds
                  )}

                  <Text style={{ opacity: 0.7 }}>
                    {" • "}Posted by {route.params.postData.postedBy}
                  </Text>
                </Chip>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: "Montserrat_400Regular",
                    fontSize: 16,
                    marginBottom: 10,
                    margin: 0,
                    marginLeft: 20,
                  }}
                >
                  {route.params.postData.initialUpdate}
                </Text>
              </View>
            </ScrollView>
          </View>

          <View
            style={[
              styles.bottomContainer,
              { backgroundColor: colors.containerColor },
            ]}
          >
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.background }]}
              mode={"outlined"}
              activeOutlineColor={"#C88D36"}
              outlineColor="#999CAD"
              textColor={colors.text}
              label="Add an update"
              value={title}
              onChangeText={(title) => setTitle(title)}
              left={<TextInput.Icon icon="camera" onPress={pickImage} />}
              right={
                <TextInput.Icon
                  icon="send"
                  onPress={async () => {
                    let usersEmail = await getEmail();
                    let submit = await postUpdate(
                      title,
                      usersEmail,
                      route.params.postData.id,
                      route.params.communityId,
                      image
                    );
                    console.log(submit);
                    if (submit.success == true) {
                      setTitle("");
                      setImage(null);
                    }
                  }}
                />
              }
            />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: Dimensions.get("window").height * 0.3,
  },
  updateImg: {
    height: Dimensions.get("window").height / 5,
    borderRadius: 10,
    marginLeft: 20,
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  fab: {
    backgroundColor: "transparent",
    margin: 0,
    paddingTop: 5,
    paddingLeft: 10,
  },
  fab2: {
    transform: [{ translateX: -10 }],
    backgroundColor: "transparent",
    opacity: 0.5,
  },
  subHeader: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  listView: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    transform: [{ translateY: -40 }],
    zIndex: 1000,
    height: Dimensions.get("window").height * 0.63,
  },
  listItem: {
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  listContainer: {
    marginTop: 10,
  },
  textInput: {
    height: Dimensions.get("window").height * 0.1,
  },
  textInput: {
    width: Dimensions.get("screen").width * 0.9,
  },
  bottomContainer: {
    height: Dimensions.get("window").height * 0.13,
    transform: [{ translateY: -40 }],
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
});
