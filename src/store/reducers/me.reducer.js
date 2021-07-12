import { actionTypes } from "../actions/me.action";

const initialState = {
  NAME: false,
  EMAIL: false,
  ID: false,
  LOADING: true
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    
    case 'USER_DATA':
      return {NAME: payload.name, EMAIL: payload.email, ID: payload.id, LOADING: false};

    case 'NO_USER':
        return {NAME: false, EMAIL: false, ID: false, LOADING: false};

    default:
      return state;
  }
}