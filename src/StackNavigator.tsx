/* eslint-disable @typescript-eslint/naming-convention */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, MapScreen } from "~/screens";

export type RootStackParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
  EatsScreen: undefined;
  RideOptionsCard: undefined;
  NavigateCard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"HomeScreen"}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={"MapScreen"}
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
