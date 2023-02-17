import * as React from "react";
import { StyleSheet, View, Pressable, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List, Chip, FAB } from "react-native-paper";
import Back from "../Back";
import { Screen } from "../Screen";
import { useTheme } from "../../theme/ThemeProvider";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

export default function Notifications() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const Footer = (
    <View
      style={[
        styles.listFooter,
        { borderBottomColor: colors.borderBottomColor },
      ]}
    >
      <Chip
        icon={() => <Icon name="clock" size={16} color={colors.text} />}
        textStyle={{ color: colors.text }}
        style={styles.chip}
        onPress={() => console.log("Pressed")}
      >
        Feb 6, 2022
      </Chip>
      <Chip
        textStyle={{ color: colors.text }}
        onPress={() => console.log("Pressed")}
        style={styles.chip}
      >
        Hoboken, NJ
      </Chip>
    </View>
  );

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
        <ScrollView>
          <List.Section>
            <List.Item
              title="Water is out in the UCC"
              titleNumberOfLines={1}
              key={1}
              titleStyle={[styles.header2, { color: colors.text }]}
              description="Water service in the University Center Complex is shut off."
              descriptionStyle={[styles.header3, { color: colors.text }]}
              style={styles.listItem}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            >
              <Chip
                icon={() => <Icon name="clock" size={16} color={colors.text} />}
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
                Stevens Institute of Technology
              </Chip>
            </View>
            <List.Item
              title="Building Fire"
              titleNumberOfLines={1}
              key={1}
              titleStyle={[styles.header2, { color: colors.text }]}
              description="Crews are on the scene of a two-alarm fire on Monroe Street."
              descriptionStyle={[styles.header3, { color: colors.text }]}
              style={styles.listItem}
            />
            {Footer}
          </List.Section>
        </ScrollView>
      </View>
    </Screen>
  );
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
    paddingTop: 60,
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
});
