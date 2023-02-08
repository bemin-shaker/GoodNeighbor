import * as React from "react";
import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

export default function BottomSheetComp({ content, header }) {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "black",
        height: Dimensions.get("window").height,
      }}
    >
      {content}
    </View>
  );

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: "black",
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: "#212121",
        borderTopWidth: 0.5,
        borderStartColor: "#212121",
        borderStartWidth: 0.2,
        borderEndColor: "#212121",
        borderEndWidth: 0.2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      }}
    >
      {header}
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[800, 650, 450, 110]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={2}
      />
    </>
  );
}
