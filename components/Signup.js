import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";

export default function Signup({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Text>Signup</Text>
        <Button
          title="Already have an account? Login"
          onPress={() => navigation.navigate("Signin")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
