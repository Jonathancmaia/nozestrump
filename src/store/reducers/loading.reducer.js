import { actionTypes } from '../actions/loading.action';

const initialState = {
  open: false,
  msg: 'Loading...'
}

export default (state = initialState, {type, data}) => {
  switch (type){

    case actionTypes.CHANGE:
      return {...state, ...data}

      default:
        return state
  }
}