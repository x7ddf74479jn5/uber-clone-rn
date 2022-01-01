import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { FlatList, Image, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";

import { images } from "~/assets";
import { selectTravelTimeInformation } from "~/slices/navSlice";
import type { RootStackParamList } from "~/StackNavigator";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: images.uberX,
  },
  {
    id: "Uber-XL-456",
    title: "Uber Xl",
    multiplier: 1.2,
    image: images.uberXL,
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: images.uberLUX,
  },
];

type Ride = {
  id: string;
  title: string;
  multiplier: number;
  image: ImageSourcePropType;
};

const SURGE_CHARGE_RATE = 1.5;

export const RideOptionsCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSelected, setIsSelected] = useState<Ride | null>(null);
  const travelInformation = useSelector(selectTravelTimeInformation);

  const handleBack = () => navigation.navigate("NavigateCard");
  const handleSelect = (item: Ride) => setIsSelected(item);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity onPress={handleBack} style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}>
          <Icon name="chevron-left" type="fontawsome" tvParallaxProperties={undefined} />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelInformation?.distance.text}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={tw`flex-row items-center justify-between px-10  ${id === isSelected?.id ? "bg-gray-200" : ""}`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={image}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {travelInformation &&
                new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "GBP",
                }).format((travelInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100)}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!isSelected} style={tw`bg-black py-3 m-3 ${!isSelected ? "bg-gray-300" : ""} `}>
          <Text style={tw`text-center text-white text-xl`}>Choose {isSelected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
