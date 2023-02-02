import * as React from "react";
import { Modal, Portal } from "react-native-paper";
import { Pressable } from "react-native";

const Popup = ({ component }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "black" };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {component}
        </Modal>
      </Portal>
      <Pressable onPress={showModal}>{component}</Pressable>
    </>
  );
};

export default Popup;
