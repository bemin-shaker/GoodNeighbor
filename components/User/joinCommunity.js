import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { joinCommunity, getEmail, getUser } from "../../backend/firebase";

export default function JoinCommunity({ route, navigation }) {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()}>
                <Text style={{ color: "white" }}>Back</Text>
            </Pressable>
            <View style={styles.header}>
                <Text style={styles.lightText}>This is</Text>
                <Text style={styles.boldText}>{route.params.name}</Text>
                <Text style={styles.count}>
                    {route.params.count} Members {" • "} {route.params.type}
                </Text>
            </View>
            <Image
                style={styles.image}
                source={require("../../assets/city.jpg")}
            ></Image>

            <Pressable
                style={styles.loginButton}
                onPress={async () => {
                    let usersEmail = await getEmail();
                    let usersId = await getUser(usersEmail);
                    let submit = await joinCommunity(
                        usersEmail,
                        route.params.id,
                        route.params.name,
                        usersId[0].id
                    );
                    if (submit == "success") {
                        navigation.navigate("CommunityFeed", {
                            id: route.params.id,
                            name: route.params.name,
                        });
                    }
                }}
            >
                <Text style={styles.loginButtonText}>Join Community</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        paddingTop: 150,
        padding: 20,
        height: Dimensions.get("screen").height * 1,
        alignItems: "center",
    },

    lightText: {
        fontFamily: "Montserrat_400Regular",
        color: "#DADADA",
        fontSize: 20,
        marginTop: 20,
    },
    count: {
        fontFamily: "Montserrat_400Regular",
        color: "#DADADA",
        fontSize: 15,
        marginTop: 15,
    },
    boldText: {
        fontSize: 25,
        marginTop: 10,
        color: "white",
        fontFamily: "Montserrat_700Bold",
        textAlign: "center",
    },
    header: {
        textAlign: "center",
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: "#C88D36",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        width: Dimensions.get("screen").width * 0.8,
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 65,
    },
    loginButtonText: {
        color: "white",
        fontSize: 17,
        textAlign: "center",
    },
    image: {
        width: Dimensions.get("screen").width * 0.8,
        height: Dimensions.get("screen").height * 0.25,

        borderRadius: 400,
        opacity: 1,
        marginTop: 30,
    },
});
