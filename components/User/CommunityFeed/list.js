import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export default function ListItems({
  communityId,
  communityName,
  posts,
  isLoading,
}) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          {posts &&
            posts.map((post) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("PostDetails", {
                      id: communityId,
                      name: communityName,
                    })
                  }
                >
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
                      />
                    )}
                  />
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 25,
    paddingBottom: 400,
  },
});
