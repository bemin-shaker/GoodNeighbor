import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, FAB, Menu, Divider, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default class MyComponent extends React.Component {
  state = {
    visible: false,
  };

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
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
          <View>
            <Menu
              contentStyle={{
                backgroundColor: "black",
                borderRadius: 20,
              }}
              visible={this.state.visible}
              style={{
                borderRadius: 20,
                zIndex: 100000,
                position: "absolute",
                minWidth: 200,
                top: 60,
                backgroundColor: "black",

                // right: 10,
                left: -160,
              }}
              onDismiss={this._closeMenu}
              anchor={
                <FAB
                  icon="dots-vertical"
                  color="white"
                  style={styles.fab}
                  onPress={this._openMenu}
                />
              }
            >
              <Menu.Item
                style={{
                  backgroundColor: "black",
                  borderBottomWidth: 0.3,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  paddingLeft: 20,
                  borderBottomColor: "#999CAD",
                }}
                onPress={() =>
                  this.props.navigation.navigate("AdminFeed", {
                    id: this.props.info.id,
                    name: this.props.info.name,
                    userId: this.props.info.userId,
                  })
                }
                title="Manage Members"
                titleStyle={{ color: "white" }}
              />
              <Menu.Item
                style={{
                  backgroundColor: "black",
                  borderRadius: 20,
                  paddingLeft: 20,
                }}
                onPress={() =>
                  this.props.navigation.navigate("AdminNotifications", {
                    id: this.props.info.id,
                    name: this.props.info.name,
                    userId: this.props.info.userId,
                  })
                }
                title="Notification Feed"
                titleStyle={{ color: "white" }}
              />
            </Menu>
          </View>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "transparent",
    borderRadius: 200,
  },
});
