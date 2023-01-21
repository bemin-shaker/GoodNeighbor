import * as React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { submitPost, getEmail } from "../../backend/firebase";
import * as ImagePicker from "expo-image-picker";
import defaultImage from "../../assets/image-not-found.png";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import { getCategories } from "../../backend/firebase";

export default function SubmitPost({ route, navigation }) {
  const [title, setTitle] = React.useState("");
  const [initialUpdate, setInitialUpdate] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([]);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  const [image, setImage] = React.useState(
    Image.resolveAssetSource(defaultImage).uri
  );

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategories(route.params.id);
        data.map((item, index) => {
          setItems((items) => [
            ...items,
            { key: index, label: item, value: item },
          ]);
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    setLocation({
      coords: {
        latitude: 40.745255,
        longitude: -74.034775,
      },
    });
  } else if (location) {
    console.log(location);
  }

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

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
      <Text style={styles.title}>Post an Incident</Text>

      <TextInput
        style={styles.textInput}
        mode={"outlined"}
        activeOutlineColor="#C88D36"
        outlineColor="#999CAD"
        textColor="#DADADA"
        label="Title"
        value={title}
        onChangeText={(title) => setTitle(title)}
      />

      <View style={{ alignItems: "center", zIndex: 1000 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="DARK"
          multiple={false}
          mode="BADGE"
          placeholder="Select a Category"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdown}
          listItemContainerStyle={styles.dropdownItem}
        />
      </View>

      <TextInput
        style={styles.textInput}
        mode={"outlined"}
        activeOutlineColor="#C88D36"
        outlineColor="#999CAD"
        textColor="#DADADA"
        label="Initial Update"
        value={initialUpdate}
        multiline={true}
        onChangeText={(initialUpdate) => setInitialUpdate(initialUpdate)}
      />

      <View style={styles.flexCont}>
        <Button
          style={styles.imgpicker}
          icon="image"
          color="black"
          onPress={pickImage}
          textColor="#C88D36"
        >
          Upload from camera roll
        </Button>
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            marginTop: 15,
            opacity: 0.6,
            backgroundColor: "#ebebeb",
          }}
        />
      </View>

      <Pressable
        style={styles.signupButton}
        onPress={async () => {
          let usersEmail = await getEmail();
          let submit = await submitPost(
            route.params.id,
            title,
            value,
            initialUpdate,
            usersEmail,
            location
          );
          if (submit == "success") {
            navigation.navigate("CommunityFeed", {
              id: route.params.id,
              name: route.params.name,
            });
          }
        }}
      >
        <Text style={styles.signupButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#000000",
    padding: 20,
    paddingTop: 40,
    height: Dimensions.get("screen").height * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: Dimensions.get("screen").width * 0.8,
    color: "#A32638",
    marginBottom: 20,
    backgroundColor: "#000000",
  },
  title: {
    color: "white",
    marginBottom: 20,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "left",
  },

  imgpicker: {
    marginTop: 47,
    marginBottom: 47,
    marginRight: 10,
    width: "90%",
  },
  flexCont: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.8,
    justifyContent: "space-around",
  },

  signupButton: {
    backgroundColor: "#C88D36",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 35,
  },
  signupButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  containerStyle: {
    flex: 1,
    maxHeight: Dimensions.get("screen").width * 0.15,
    width: Dimensions.get("screen").width * 0.8,
  },
  dropdown: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "#999CAD",
    marginBottom: 15,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 5,
  },
  dropdownItem: {
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#999CAD",
  },
  dropdownText: {
    opacity: 0.4,
    fontSize: 16,
  },
});
