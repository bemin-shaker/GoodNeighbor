import * as React from "react";
import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { useTheme } from "../theme/ThemeProvider";

export default function BottomSheetComp({ content, header }) {
  const { colors } = useTheme();
  const renderContent = () => (
    <View
      style={{
        backgroundColor: colors.containerColor,
        height: Dimensions.get("window").height,
      }}
    >
      {content}
    </View>
  );

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: colors.containerColor,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: colors.borderBottomColor,
        borderTopWidth: 0.5,
        borderStartColor: colors.borderBottomColor,
        borderStartWidth: 0.2,
        borderEndColor: colors.borderBottomColor,
        borderEndWidth: 0.2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.22,
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
        snapPoints={["85%", "50%", 110]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={1}
      />
    </>
  );
}
