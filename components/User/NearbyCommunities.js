import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { getCommunities } from "../../backend/firebase";
import { List } from "react-native-paper";

export default function NearbyCommunities() {
  const [loading, setLoading] = useState(true);
  const [shows, setShowData] = useState([undefined]);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    console.log("useEffect has been called");

    async function fetchData() {
      try {
        const data = await getCommunities();
        setShowData(data);

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.header}>Nearby Communities</Text>
        <List.Section>
          {shows &&
            shows.map((show) => {
              return (
                <List.Item
                  title={show.name}
                  titleStyle={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "Montserrat_700Bold",
                  }}
                  style={{
                    backgroundColor: "#323232",
                    padding: 10,
                    marginBottom: 15,
                  }}
                  left={() => (
                    <List.Icon
                      color={"#323232"}
                      style={{
                        backgroundColor: "#F5F5F9",
                        borderRadius: 50,
                        padding: 7,
                      }}
                      icon="city"
                    />
                  )}
                />
              );
            })}
        </List.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: "white",
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
  },
});
