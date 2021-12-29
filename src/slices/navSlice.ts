import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Point } from "react-native-google-places-autocomplete";

import type { RootState } from "~/store";

interface MapInfo {
  location: Point;
  description: string;
}

interface TravelInfo {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
}

interface NavState {
  origin: MapInfo | null;
  destination: MapInfo | null;
  travelTimeInformation: TravelInfo | null;
}

const initialState: NavState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<NavState["origin"]>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<NavState["destination"]>) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action: PayloadAction<NavState["travelTimeInformation"]>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) => state.nav.travelTimeInformation;

export const navReducer = navSlice.reducer;
