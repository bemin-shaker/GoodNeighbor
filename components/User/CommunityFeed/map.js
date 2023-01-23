import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const MapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

export default function Map({ communityId, communityName, posts, isLoading }) {
  const navigation = useNavigation();
  //  console.log(posts);

  if (isLoading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          zoomEnabled={true}
          style={styles.map}
          userInterfaceStyle="dark"
          initialRegion={{
            latitude: 40.745255,
            longitude: -74.034775,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.02821,
          }}
        >
          {posts &&
            posts.map((marker, index) => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.location.latitude,
                    longitude: marker.location.longitude,
                  }}
                  image={require("../../../assets/marker.png")}
                  tappable={true}
                  calloutAnchor={{ x: 2.8, y: 1 }}
                >
                  <Callout
                    tooltip={true}
                    style={{
                      minWidth: 100,
                      height: 40,
                      backgroundColor: "#333235",
                      borderRadius: 20,
                      color: "white",
                      alignItems: "center",
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      opacity: 0.9,
                    }}
                    onPress={() =>
                      navigation.navigate("PostDetails", {
                        postData: marker,
                        id: communityId,
                        name: communityName,
                      })
                    }
                  >
                    <Text style={{ color: "white" }}>{marker.title}</Text>
                  </Callout>
                </Marker>
              );
            })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: Dimensions.get("screen").height * 0.55,
  },
});
