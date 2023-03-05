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
import Back from "../Back";
import { useTheme } from "../../theme/ThemeProvider";

export default function SubmitPost({ route, navigation }) {
  const [title, setTitle] = React.useState("");
  const [initialUpdate, setInitialUpdate] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([]);

  const { colors, isDark } = useTheme();

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
        //setLoading(false);
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
    //console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Back />

      <Text style={[styles.title, { color: colors.text }]}>
        Post an Incident
      </Text>

      <TextInput
        style={[styles.textInput, { backgroundColor: colors.containerColor }]}
        mode={"outlined"}
        activeOutlineColor="#C88D36"
        outlineColor="#999CAD"
        textColor={colors.text}
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
          theme={isDark ? "DARK" : "LIGHT"}
          multiple={false}
          mode="BADGE"
          placeholder="Select a Category"
          placeholderStyle={{ opacity: isDark ? 0.2 : 1 }}
          style={[styles.dropdown, { backgroundColor: colors.containerColor }]}
          textStyle={[styles.dropdownText, { color: colors.text }]}
          dropDownContainerStyle={[
            styles.dropdown,
            { backgroundColor: colors.containerColor },
          ]}
          listItemContainerStyle={[
            styles.dropdownItem,
            { backgroundColor: colors.containerColor },
          ]}
          activeOutlineColor="#C88D36"
          outlineColor="#999CAD"
        />
      </View>

      <TextInput
        style={[styles.textInput, { backgroundColor: colors.containerColor }]}
        mode={"outlined"}
        activeOutlineColor="#C88D36"
        outlineColor="#999CAD"
        textColor={colors.text}
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
            location,
            image
          );
          if (submit["success"] == true) {
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
    padding: 20,
    paddingTop: 40,
    height: Dimensions.get("screen").height * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: Dimensions.get("screen").width * 0.8,
    marginBottom: 20,
  },
  title: {
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
    borderRadius: 45,
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
    borderWidth: 1,
    borderColor: "#999CAD",
    marginBottom: 15,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 5,
  },
  dropdownItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#999CAD",
  },
  dropdownText: {
    fontSize: 16,
  },
});
