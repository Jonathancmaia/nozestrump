import { actionTypes } from '../actions/showItems.action';

const initialState = {
  data: 0
};

export default (state = initialState, {type, data}) => {
  switch (type){

    case actionTypes.CHANGE:
      return {data}

      default:
        return state
  }
}