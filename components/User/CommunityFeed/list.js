import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ListItems({ communityId, postsData }) {
  const navigation = useNavigation();
  console.log("hi", postsData);
  return (
    <View>
      {postsData &&
        postsData.map((post) => {
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

const styles = StyleSheet.create({});
