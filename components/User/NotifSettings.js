import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Switch, List, Snackbar } from "react-native-paper";
import { useTheme } from "../../theme/ThemeProvider";
import Back from "../Back";
import {
  getCategories,
  updateSubscribedCategories,
  getSubscribedCategories,
} from "../../backend/firebase";

const NotifSettings = ({ route }) => {
  const [visible, setVisible] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState([undefined]);
  const [isSwitchOnFire, setIsSwitchOnFIre] = React.useState(false);
  const [isSwitchOnCarCrash, setIsSwitchOnCarCrash] = React.useState(false);
  const [isSwitchOnFlooding, setIsSwitchOnFlooding] = React.useState(false);
  const [isSwitchOnMissingPet, setIsSwitchOnMissingPet] = React.useState(false);
  const [isSwitchOnMissingPerson, setIsSwitchOnMissingPerson] =
    React.useState(false);
  const [isSwitchOnWaterMainBreak, setIsSwitchOnWaterMainBreak] =
    React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [catList, setCatList] = React.useState([undefined]);
  const [refreshing, setRefreshing] = React.useState(true);

  const { colors } = useTheme();

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setRefreshing(true);
      const data = await getCategories(route.params.id);
      setCatList(data);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
      let subscribedData = await getSubscribedCategories(
        route.params.id,
        route.params.userId
      );
      setSubscribed(subscribedData);

      subscribed.forEach((item) => {
        if (item == "Fire") {
          setIsSwitchOnFIre(true);
        } else if (item == "Car Crash") {
          setIsSwitchOnCarCrash(true);
        } else if (item == "Flooding") {
          setIsSwitchOnFlooding(true);
        } else if (item == "Missing Pet") {
          setIsSwitchOnMissingPet(true);
        } else if (item == "Missing Person") {
          setIsSwitchOnMissingPerson(true);
        } else if (item == "Water Main Break") {
          setIsSwitchOnWaterMainBreak(true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Back />
        <Text style={[styles.header, { color: colors.text }]}>
          Notification Preferences
        </Text>
        {catList &&
          catList.map((post, index) => {
            return <></>;
          })}

        {/* Fire */}

        {refreshing ? (
          <ActivityIndicator
            style={{
              backgroundColor: colors.activityIndicatorBgColor,
              padding: 20,
              zIndex: 10000,
            }}
            color="#C88D36"
            size="small"
          />
        ) : null}
        <ScrollView
          RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
          tintColor="transparent"
          colors={["transparent"]}
          style={{ backgroundColor: "transparent" }}
        >
          <List.Section>
            <List.Item
              title={"Fire"}
              titleNumberOfLines={2}
              key={2}
              titleStyle={[styles.header2, { color: colors.text }]}
              style={[
                styles.listItem,
                { borderBottomColor: colors.borderBottomColor },
              ]}
              right={() => (
                <Switch
                  color={colors.tabBarActiveColor}
                  style={{ alignSelf: "center" }}
                  value={isSwitchOnFire}
                  onValueChange={() => setIsSwitchOnFIre(!isSwitchOnFire)}
                />
              )}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            ></View>

            {/* Water Main Break */}
            <List.Item
              title={"Water Main Break"}
              titleNumberOfLines={2}
              key={2}
              titleStyle={[styles.header2, { color: colors.text }]}
              style={[
                styles.listItem,
                { borderBottomColor: colors.borderBottomColor },
              ]}
              right={() => (
                <Switch
                  color={colors.tabBarActiveColor}
                  style={{ alignSelf: "center" }}
                  value={isSwitchOnWaterMainBreak}
                  onValueChange={() =>
                    setIsSwitchOnWaterMainBreak(!isSwitchOnWaterMainBreak)
                  }
                />
              )}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            ></View>

            {/* Car Crash */}
            <List.Item
              title={"Car Crash"}
              titleNumberOfLines={2}
              key={2}
              titleStyle={[styles.header2, { color: colors.text }]}
              style={[
                styles.listItem,
                { borderBottomColor: colors.borderBottomColor },
              ]}
              right={() => (
                <Switch
                  color={colors.tabBarActiveColor}
                  style={{ alignSelf: "center" }}
                  value={isSwitchOnCarCrash}
                  onValueChange={() =>
                    setIsSwitchOnCarCrash(!isSwitchOnCarCrash)
                  }
                />
              )}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            ></View>

            {/* Flooding */}
            <List.Item
              title={"Flooding"}
              titleNumberOfLines={2}
              key={2}
              titleStyle={[styles.header2, { color: colors.text }]}
              style={[
                styles.listItem,
                { borderBottomColor: colors.borderBottomColor },
              ]}
              right={() => (
                <Switch
                  color={colors.tabBarActiveColor}
                  style={{ alignSelf: "center" }}
                  value={isSwitchOnFlooding}
                  onValueChange={() =>
                    setIsSwitchOnFlooding(!isSwitchOnFlooding)
                  }
                />
              )}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            ></View>

            {/* Missing Pet */}

            <List.Item
              title={"Missing Pet"}
              titleNumberOfLines={2}
              key={2}
              titleStyle={[styles.header2, { color: colors.text }]}
              style={[
                styles.listItem,
                { borderBottomColor: colors.borderBottomColor },
              ]}
              right={() => (
                <Switch
                  color={colors.tabBarActiveColor}
                  style={{ alignSelf: "center" }}
                  value={isSwitchOnMissingPet}
                  onValueChange={() =>
                    setIsSwitchOnMissingPet(!isSwitchOnMissingPet)
                  }
                />
              )}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            ></View>

            {/* Missing Person */}
            <List.Item
              title={"Missing Person"}
              titleNumberOfLines={2}
              key={2}
              titleStyle={[styles.header2, { color: colors.text }]}
              style={[
                styles.listItem,
                { borderBottomColor: colors.borderBottomColor },
              ]}
              right={() => (
                <Switch
                  color={colors.tabBarActiveColor}
                  style={{ alignSelf: "center" }}
                  value={isSwitchOnMissingPerson}
                  onValueChange={() =>
                    setIsSwitchOnMissingPerson(!isSwitchOnMissingPerson)
                  }
                />
              )}
            />
            <View
              style={[
                styles.listFooter,
                { borderBottomColor: colors.borderBottomColor },
              ]}
            ></View>

            <Pressable
              style={styles.loginButton}
              onPress={async () => {
                let subscribedCategories = [];
                if (isSwitchOnFire) {
                  subscribedCategories.push("Fire");
                }
                if (isSwitchOnCarCrash) {
                  subscribedCategories.push("Car Crash");
                }
                if (isSwitchOnFlooding) {
                  subscribedCategories.push("Flooding");
                }
                if (isSwitchOnMissingPet) {
                  subscribedCategories.push("Missing Pet");
                }
                if (isSwitchOnMissingPerson) {
                  subscribedCategories.push("Missing Person");
                }
                if (isSwitchOnWaterMainBreak) {
                  subscribedCategories.push("Water Main Break");
                }

                let submit = await updateSubscribedCategories(
                  route.params.id,
                  route.params.userId,
                  subscribedCategories
                );
                if (submit == "success") {
                  // to do
                  setVisible(!visible);
                }
              }}
            >
              <Text style={styles.loginButtonText}>Save Changes</Text>
            </Pressable>
          </List.Section>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <Snackbar
            style={[
              styles.snackbar,
              { backgroundColor: colors.tabBarActiveColor },
            ]}
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: "Dismiss",
              labelStyle: { color: "white" },
            }}
          >
            <Text style={styles.errorMsg}>Changes updated successfully.</Text>
          </Snackbar>
        </View>
      </View>
    );
  }
};

export default NotifSettings;

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    height: Dimensions.get("screen").height * 1,
  },
  header: {
    marginBottom: 15,
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
    paddingHorizontal: 20,
  },
  header2: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
  },
  listItem: {
    paddingHorizontal: 8,
  },
  listFooter: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#C88D36",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 40,
    marginBottom: 15,
    marginTop: 50,
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  snackbar: {
    transform: [{ translateY: 15 }],
  },
  errorMsg: {
    color: "white",
  },
});
