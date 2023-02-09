import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List, FAB, Chip, Divider } from "react-native-paper";
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
  refreshing,
  fetchPostData,
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
        {refreshing ? (
          <ActivityIndicator
            style={{
              backgroundColor: "black",
              padding: 20,
              zIndex: 10000,
            }}
            color="#C88D36"
            size="small"
          />
        ) : null}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPostData} />
          }
        >
          {posts &&
            posts.map((post, index) => {
              return (
                <View>
                  <Pressable
                    style={styles.listItem}
                    key={index}
                    onPress={() =>
                      navigation.navigate("PostDetails", {
                        postData: post,
                        id: communityId,
                        name: communityName,
                        refreshing: refreshing,
                        fetchPostData: fetchPostData,
                      })
                    }
                  >
                    <List.Item
                      key={index}
                      title={post.title}
                      titleNumberOfLines={1}
                      titleStyle={{
                        color: "white",
                        fontFamily: "Montserrat_600SemiBold",
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                      description={post.initialUpdate}
                      descriptionNumberOfLines={2}
                      descriptionStyle={{ color: "#DADADA" }}
                      left={(props) => (
                        <List.Image
                          key={post.id}
                          variant="image"
                          source={{
                            uri: post.imageUrl,
                          }}
                          style={{
                            borderRadius: 10,
                          }}
                        />
                      )}
                    />
                    <View style={{ display: "flex", flexDirection: "row" }}>
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
                        onPress={() =>
                          navigation.navigate("PostDetails", {
                            postData: post,
                            id: communityId,
                            name: communityName,
                          })
                        }
                      >
                        {post.updates.length}
                      </Chip>
                      <Chip
                        icon={() => (
                          <Icon name="share" size={16} color="white" />
                        )}
                        title={post.updates.length}
                        style={styles.fab}
                        textStyle={{ color: "white" }}
                        onPress={() => console.log("Pressed")}
                      >
                        Share
                      </Chip>
                    </View>
                  </Pressable>
                  <Divider style={{ opacity: 0.6 }} />
                </View>
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
    //paddingBottom: 400,
  },
  fab: {
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
  listItem: {
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 10,
  },
});
