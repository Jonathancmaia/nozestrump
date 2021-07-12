import { actionTypes } from '../actions/alert.action';

const initialState = {
  open: false,
  class: 'success',
  time: 3000,
  msg: 'Alert!'
}

export default (state = initialState, {type, data}) => {
  switch (type){

    case actionTypes.CHANGE:
      return {...state, ...data}

      default:
        return state
  }
}