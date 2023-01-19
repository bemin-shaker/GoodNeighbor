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
import { List, FAB, Chip, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { makeUpdate, getEmail } from "../../../backend/firebase";

export default function PostDetails({ route, navigation }) {
  const [title, setTitle] = React.useState("");
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

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
      return hours + " hr ago";
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
      setImage(result.assets[0].uri);
    }
  };

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
          {returnElapsedTIme(route.params.postData.initialTimestamp.seconds)}
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
                  <Chip
                    icon={() => (
                      <Icon name="clock-outline" size={16} color="#BDBDBD" />
                    )}
                    style={styles.fab2}
                    textStyle={{
                      color: "#BDBDBD",
                      transform: [{ translateX: -3 }],
                    }}
                    onPress={() => console.log("Pressed")}
                  >
                    {returnElapsedTIme(post.timestamp.seconds)}
                  </Chip>
                  <Text
                    key={index}
                    style={{
                      color: "white",
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 16,
                      marginBottom: 10,
                      margin: 0,
                      marginLeft: 20,
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
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.textInput}
          mode={"outlined"}
          activeOutlineColor="#C88D36"
          outlineColor="#999CAD"
          textColor="#DADADA"
          label="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
          left={<TextInput.Icon icon="camera" onPress={pickImage} />}
          right={
            <TextInput.Icon
              icon="send"
              onPress={async () => {
                let usersEmail = await getEmail();
                let submit = await makeUpdate(
                  title,
                  usersEmail,
                  route.params.postData.id,
                  route.params.id
                );
                if (submit == "success") {
                  navigation.navigate("CommunityFeed", {
                    id: route.params.id,
                    name: route.params.name,
                  });
                }
              }}
            />
          }
        />
      </View>
    </View>
  );
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
  fab2: {
    transform: [{ translateX: -10 }],
    backgroundColor: "transparent",
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
    height: Dimensions.get("window").height * 0.63,
  },
  listItem: {
    marginBottom: 30,
  },
  listContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  textInput: {
    height: Dimensions.get("window").height * 0.1,
  },
  textInput: {
    width: Dimensions.get("screen").width * 0.9,
    color: "#A32638",
    backgroundColor: "#000000",
  },
  bottomContainer: {
    height: Dimensions.get("window").height * 0.13,
    transform: [{ translateY: -40 }],
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: "#000000",
  },
});
