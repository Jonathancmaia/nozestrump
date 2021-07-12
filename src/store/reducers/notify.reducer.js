import { actionTypes } from '../actions/notify.action';

const initialState = {
  open: false,
  horizontal: 'center',
  vertical: 'top',
  class: 'success',
  time: 3000,
  msg: 'Notification!'
}

export default (state = initialState, {type, data}) => {
  switch (type){

    case actionTypes.CHANGE:
      return {...state, ...data}

      default:
        return state
  }
}