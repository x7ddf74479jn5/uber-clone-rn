import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import type { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";

import { setDestination } from "~/slices/navSlice";

import { NavFavorites } from "./NavFavorites";

export const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleKeyPress = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (!data || !details) return;

    dispatch(
      setDestination({
        location: details.geometry.location,
        description: data.description,
      })
    );

    navigation.navigate("RideOptionsCard" as never);
  };
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where To?"
            styles={toInputBoxStyles}
            onPress={(data, details) => handleKeyPress(data, details)}
            fetchDetails
            // returnKeyType="search"
            minLength={2}
            enablePoweredByContainer={false}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "jp",
            }}
          />
        </View>

        <NavFavorites />
      </View>

      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 `}>
        <TouchableOpacity style={tw`flex flex-row bg-black justify-between w-24 px-4 py-3 rounded-full`}>
          <Icon name="car" type="font-awesome" color="white" size={16} tvParallaxProperties={undefined} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16} tvParallaxProperties={undefined} />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
