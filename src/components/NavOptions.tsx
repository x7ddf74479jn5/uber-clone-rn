import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";

import { images } from "~/assets";
import { selectOrigin } from "~/slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: images.ride,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: images.food,
    screen: "EatsScreen",
  },
];

export const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const handleNavigation = (screen: string) => navigation.navigate(screen as never);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleNavigation(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        >
          <View style={tw`${!origin ? "opacity-20" : ""}`}>
            <Image style={{ width: 120, height: 120, resizeMode: "contain" }} source={item.image} />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
              tvParallaxProperties={undefined}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
