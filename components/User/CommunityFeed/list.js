import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ListItems({ communityId }) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("PostDetails", { id: communityId })}
      >
        <List.Item
          title="First Item"
          description="Item description"
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
    </View>
  );
}

const styles = StyleSheet.create({});
