import { Platform } from "react-native";

// Font family constants
export const FONT_FAMILIES = {
  regular: "LINESeedSansTH-Regular",
  bold: Platform.OS === "android" ? "LINESeedSansTH_Bold" : "LINESeedSansTH-Bold",
};

// Font style objects for easy use
export const fontRegular = {
  fontFamily: FONT_FAMILIES.regular,
};

export const fontBold = {
  fontFamily: FONT_FAMILIES.bold,
};

// Font size constants
export const FONT_SIZES = {
  small: 12,
  medium: 14,
  regular: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
};

// Combined font styles with sizes
export const fontStyles = {
  small: { ...fontRegular, fontSize: FONT_SIZES.small },
  smallBold: { ...fontBold, fontSize: FONT_SIZES.small },
  medium: { ...fontRegular, fontSize: FONT_SIZES.medium },
  mediumBold: { ...fontBold, fontSize: FONT_SIZES.medium },
  regular: { ...fontRegular, fontSize: FONT_SIZES.regular },
  regularBold: { ...fontBold, fontSize: FONT_SIZES.regular },
  large: { ...fontRegular, fontSize: FONT_SIZES.large },
  largeBold: { ...fontBold, fontSize: FONT_SIZES.large },
  xlarge: { ...fontRegular, fontSize: FONT_SIZES.xlarge },
  xlargeBold: { ...fontBold, fontSize: FONT_SIZES.xlarge },
  xxlarge: { ...fontRegular, fontSize: FONT_SIZES.xxlarge },
  xxlargeBold: { ...fontBold, fontSize: FONT_SIZES.xxlarge },
};