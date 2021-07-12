import { actionTypes } from "../actions/items.action";

const initialState = {
  ITEMS: [],
  PHOTO: [],
  LOADING: true,
  LOADING_PHOTO: true
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    
    case actionTypes.INDEX_ITEMS: 
      return {...state, ITEMS: payload}

    case actionTypes.INDEX_LOADING:
      return {...state, LOADING: payload}

    case actionTypes.INDEX_PHOTO:
      return {...state, PHOTO: [...state.PHOTO, payload]};

    case actionTypes.LOADING_PHOTO:
      return {...state, LOADING_PHOTO: payload}

    default:
      return state;
  }
}
