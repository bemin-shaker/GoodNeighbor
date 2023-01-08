import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ListItems({ communityId, posts, isLoading }) {
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <View>
        {posts &&
          posts.map((post) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("PostDetails", { id: communityId })
                }
              >
                <List.Item
                  key={post.id}
                  title={post.title}
                  description={post.initialUpdate}
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
    );
  }
}

const styles = StyleSheet.create({});
