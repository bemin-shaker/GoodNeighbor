import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { List, FAB, Chip } from "react-native-paper";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Timestamp } from "firebase/firestore";

export default function PostDetails({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  function returnElapsedTIme() {
    let hours;
    let seconds = Math.floor(new Date().getTime() / 1000);
    let initialSeconds = route.params.postData.initialTimestamp.seconds;
    let difference = seconds - initialSeconds;
    if (difference <= 60) {
      return "Less than a minute ago";
    } else if (difference < 3600 && difference > 60) {
      hours = Math.floor(difference / 60);
      return hours + " min ago";
    } else {
      hours = Math.floor(difference / 3600);
      return hours + " hr ago";
    }
  }

  return (
    <View>
      <Image
        style={styles.img}
        variant="image"
        source={{
          uri: "https://cdn.abcotvs.com/dip/images/12521532_120322-wabc-hamilton-heights-fire-img.jpg",
        }}
      ></Image>

      <View style={styles.listView}>
        <Text style={styles.header}>{route.params.postData.title}</Text>
        <Chip
          icon={() => <Icon name="clock-outline" size={16} color="#BDBDBD" />}
          style={styles.fab}
          textStyle={{ color: "#BDBDBD", transform: [{ translateX: -3 }] }}
          onPress={() => console.log("Pressed")}
        >
          {returnElapsedTIme()}
        </Chip>
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
        <Text style={styles.subHeader}>Updates</Text>
        <ScrollView style={styles.listContainer}>
          {route.params.postData.updates &&
            route.params.postData.updates.map((post, index) => {
              return (
                <View style={styles.listItem}>
                  <Text
                    key={index}
                    style={{
                      color: "white",
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 16,
                      marginBottom: 10,
                      margin: 0,
                    }}
                  >
                    {post.title}
                  </Text>
                  <Image
                    style={styles.updateImg}
                    variant="image"
                    source={{
                      uri: "https://cdn.abcotvs.com/dip/images/12521532_120322-wabc-hamilton-heights-fire-img.jpg",
                    }}
                  ></Image>
                </View>
              );
            })}
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: Dimensions.get("window").height / 3,
  },
  updateImg: {
    height: Dimensions.get("window").height / 5,
    borderRadius: 10,
  },
  header: {
    color: "white",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  fab: {
    backgroundColor: "transparent",
    margin: 0,
    paddingTop: 5,
    paddingLeft: 10,
  },
  subHeader: {
    color: "#C88D36",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  listView: {
    backgroundColor: "#000000",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    transform: [{ translateY: -40 }],
    zIndex: 1000,
  },
  listItem: {
    marginBottom: 30,
  },
  listContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
  },
});
