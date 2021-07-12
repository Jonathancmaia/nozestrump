import { actionTypes } from '../actions/auth.action';

const initialState = {
  credentials: {
    email: '',
    password: ''
  },
  success: false
}

export default (state = initialState, {type, data}) => {
  switch (type){

    case actionTypes.CHANGE:
      return {...state, credentials: {
        ...state.credentials,
        ...data
      }}

    case actionTypes.SUCCESS:
      return {...state, success: data}

      default:
        return state
  }
}