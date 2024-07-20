import { useSafeAreaInsets } from "react-native-safe-area-context";

const useMaterialNavBarHeight = (withoutBottomTabs: any) => {
  const { bottom, top } = useSafeAreaInsets();
  console.log({ bottom, top });
  return bottom - Math.floor(top) + (withoutBottomTabs ? 0 : 140);
};

export default useMaterialNavBarHeight;
