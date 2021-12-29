import { GOOGLE_MAPS_APIKEY } from "@env";
import { Image, SafeAreaView, View } from "react-native";
import type { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";

import { images } from "~/assets";
import { NavFavorites, NavOptions } from "~/components";
import { setDestination, setOrigin } from "~/slices/navSlice";

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleKeyPress = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (!data || !details) return;

    dispatch(
      setOrigin({
        location: details.geometry.location,
        description: data.description,
      })
    );

    dispatch(setDestination(null));
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={images.logo}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details) => handleKeyPress(data, details)}
          fetchDetails
          // returnKeyType="search"
          minLength={2}
          enablePoweredByContainer={false}
          placeholder="Where From?"
          debounce={400}
          nearbyPlacesAPI="GooglePlacesSearch"
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "jp",
          }}
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};
