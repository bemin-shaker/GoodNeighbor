import * as React from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import { FAB } from "react-native-paper";
import { useTheme } from "../../theme/ThemeProvider";
import MyCommunities from "./MyCommunities";
import { Screen } from "../Screen";
import { getEmail, getUser } from "../../backend/firebase";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function HomeFeed({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(true);
  const { colors, isDark } = useTheme();
  const [name, setName] = React.useState("Bemin");

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  async function fetchData() {
    try {
      setRefreshing(true);
      const email = await getEmail();
      const data = await getUser(email);
      setName(data[0]["full_name"]);
      console.log(name);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Screen>
      <View style={[styles.container, { backgroundColor: colors.homeHeader }]}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.boldText, { color: colors.headerText }]}>
              Good
              <Text style={styles.lightText}>Neighbor</Text>
            </Text>
            {/* <Text style={[styles.subText]}>Hi, {name.split(" ")[0]}</Text> */}
          </View>

          <FAB
            icon="bell-badge"
            color={colors.fabColor}
            style={[styles.fab, { backgroundColor: colors.fabBgColor }]}
            size={"small"}
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
        <MyCommunities />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    height: Dimensions.get("screen").height * 1,
  },
  lightText: {
    fontFamily: "Montserrat_400Regular",
  },
  subText: {
    fontFamily: "Montserrat_400Regular",
    color: "#00478d",
    fontSize: 16,
  },
  boldText: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
  },
  header: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  fab: {
    borderRadius: 50,
    shadowRadius: 0,
    shadowColor: "transparent",
  },
});
