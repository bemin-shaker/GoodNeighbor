import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Switch, List } from "react-native-paper";
import { useTheme } from "../../theme/ThemeProvider";
import Back from "../Back";
import { getCategories } from "../../backend/firebase";

const NotifSettings = ({ route }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [catList, setCatList] = React.useState([undefined]);
  const [refreshing, setRefreshing] = React.useState(true);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Back />
      <Text style={[styles.header, { color: colors.text }]}>
        Notification Preferences
      </Text>
      {catList &&
        catList.map((post, index) => {
          return (
            <List.Item
              title={post}
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
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                />
              )}
            />
          );
        })}
    </View>
  );
};

export default NotifSettings;

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    padding: 20,
    height: Dimensions.get("screen").height * 1,
  },
  header: {
    marginBottom: 15,
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
  },
  header2: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
  },
});
