import { Types } from "../Type";

const initialState = {
  latLong: "",
  coffeeStore: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LAT_LONG:
      return {
        ...state,
        latLong: action.payload,
      };

    case Types.SET_COFFEE_STORE:
      return {
        ...state,
        coffeeStore: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
