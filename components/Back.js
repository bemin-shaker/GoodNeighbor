import * as React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../theme/ThemeProvider";

export default function Back() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={28} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 100000,
  },
});
