import * as React from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Menu, Provider } from "react-native-paper";
import { useTheme } from "../../../theme/ThemeProvider";
import { removePost, keepPost, reportPost } from "../../../backend/firebase";

export default function PostMenu({
  navigation,
  postId,
  communityId,
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
                icon="information-outline"
                color="white"
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
                  onPress={async () => {
                    await removePost(communityId, postId);
                    navigation.goBack();
                  }}
                  title="Remove Post"
                  titleStyle={{ color: colors.text }}
                  leadingIcon="delete"
                />
                <Menu.Item
                  style={{
                    backgroundColor: colors.containerColor,
                    paddingLeft: 15,
                    paddingBottom: 5,
                  }}
                  onPress={async () => {
                    await keepPost(communityId, postId);
                    navigation.goBack();
                  }}
                  title="Keep Post"
                  titleStyle={{ color: colors.text }}
                  leadingIcon="check"
                />
              </>
            ) : (
              <>
                <Menu.Item
                  style={{
                    backgroundColor: colors.containerColor,
                    paddingLeft: 15,
                    paddingBottom: 5,
                  }}
                  onPress={async () => {
                    await reportPost(communityId, postId);
                    navigation.goBack();
                  }}
                  title="Report Post"
                  titleStyle={{ color: colors.text }}
                  leadingIcon="alert-circle"
                />
              </>
            )}
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
