import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { List, FAB, Chip } from "react-native-paper";
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
      <View style={styles.container}>
        <ScrollView>
          {posts &&
            posts.map((post, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("PostDetails", {
                      postData: post,
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
                        style={{
                          borderRadius: 10,
                        }}
                      />
                    )}
                  />
                  <View>
                    <Chip
                      icon={() => (
                        <Icon
                          name="comment-processing"
                          size={16}
                          color="white"
                        />
                      )}
                      title={post.updates.length}
                      style={styles.fab}
                      textStyle={{ color: "white" }}
                      onPress={() => console.log("Pressed")}
                    >
                      {post.updates.length}
                    </Chip>
                  </View>
                </Pressable>
              );
            })}
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 400,
  },
  fab: {
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
});
