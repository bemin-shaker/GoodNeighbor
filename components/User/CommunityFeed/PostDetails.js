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
} from "@expo-google-fonts/montserrat";

export default function PostDetails({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

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
        <ScrollView>
          {route.params.postData.updates &&
            route.params.postData.updates.map((post) => {
              return (
                <List.Item
                  key={post.id}
                  title={post.title}
                  titleStyle={{
                    color: "white",
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                  description={post.initialUpdate}
                  descriptionStyle={{ color: "#DADADA" }}
                  left={(props) => (
                    <List.Image
                      key={post.id}
                      variant="image"
                      source={{
                        uri: "https://cdn.abcotvs.com/dip/images/12521532_120322-wabc-hamilton-heights-fire-img.jpg",
                      }}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  )}
                />
              );
            })}
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
  },
  img: {
    height: Dimensions.get("window").height / 3,
  },
  header: {
    color: "white",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  listView: {
    backgroundColor: "#000000",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    transform: [{ translateY: -40 }],
    zIndex: 1000,
  },
});
