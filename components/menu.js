import * as React from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Menu, Provider } from "react-native-paper";
import { useTheme } from "../theme/ThemeProvider";
import { removeMember } from "../backend/firebase";

export default function MenuComponent({
  navigation,
  id,
  name,
  userId,
  isAdmin,
  email,
}) {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();

  return (
    <View
      style={{
        zIndex: 100000,
        position: "absolute",
        width: 60,
        top: 40,
        right: 0,
      }}
    >
      <Provider>
        <View style={styles.container}>
          <Menu
            contentStyle={{
              backgroundColor: colors.containerColor,
            }}
            visible={visible}
            style={{
              zIndex: 100000,
              position: "absolute",
              minWidth: 200,
              top: 60,
              backgroundColor: colors.containerColor,
              left: -160,
            }}
            onDismiss={() => setVisible(false)}
            anchor={
              <FAB
                icon="dots-vertical"
                color={colors.text}
                style={styles.fab}
                onPress={() => setVisible(true)}
              />
            }
          >
            {isAdmin == true ? (
              <>
                <Menu.Item
                  style={{
                    backgroundColor: colors.containerColor,
                    paddingLeft: 15,
                    paddingBottom: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("AdminFeed", {
                      id: id,
                      name: name,
                      userId: userId,
                    })
                  }
                  title="Manage Members"
                  titleStyle={{ color: colors.text }}
                  leadingIcon="account-group"
                />
                <Menu.Item
                  style={{
                    backgroundColor: colors.containerColor,
                    paddingLeft: 15,
                    paddingTop: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("AdminNotifications", {
                      id: id,
                      name: name,
                      userId: userId,
                    })
                  }
                  title="Notification Feed"
                  titleStyle={{ color: colors.text }}
                  leadingIcon="bell"
                />
              </>
            ) : (
              <></>
            )}
            <Menu.Item
              style={{
                backgroundColor: colors.containerColor,
                paddingLeft: 15,
                paddingTop: 5,
              }}
              onPress={async () => {
                navigation.navigate("NotifSettings", {
                  id: id,
                  name: name,
                  userId: userId,
                });
              }}
              title="Preferences"
              titleStyle={{ color: colors.text }}
              leadingIcon="cog"
            />
            <Menu.Item
              style={{
                backgroundColor: colors.containerColor,
                paddingLeft: 15,
                paddingTop: 5,
              }}
              onPress={async () => {
                let submit = await removeMember(
                  id,
                  name,
                  userId,
                  email,
                  isAdmin
                );
                if (submit == "success") {
                  navigation.navigate("Home");
                }
              }}
              title="Leave Community"
              titleStyle={{ color: colors.text }}
              leadingIcon="account-remove"
            />
          </Menu>
        </View>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "transparent",
    borderRadius: 200,
  },
});
