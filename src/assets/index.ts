import type { ImageSourcePropType } from "react-native";

type ImageName = "logo" | "ride" | "food" | "uberX" | "uberXL" | "uberLUX";

export const images: { [key in ImageName]: ImageSourcePropType } = {
  logo: require("./2560px-Uber_logo_2018.svg.png"),
  ride: require("./UberX.webp"),
  food: require("./4feb745209cf7aba57463b20d27b61e3.png"),
  uberX: require("./UberX.webp"),
  uberXL: require("./UberXL.webp"),
  uberLUX: require("./Lux.webp"),
};
