import { Types } from "../Type";

export const setLatLong = (payload) => {
  return {
    type: Types.SET_LAT_LONG,
    payload,
  };
};

export const setCoffeeStore = (payload) => {
  return {
    type: Types.SET_COFFEE_STORE,
    payload,
  };
};
