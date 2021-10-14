import { actionTypes } from '../actions/problem.action';

const initialState = {
  problem: {
    'nome': '',
    'email': '',
    'telefone': '',
    'problema': ''
  },
  success: false,
  error: {}
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.CHANGE:
      return {
        ...state,
        problem: {
          ...state.problem,
          ...data
        }
      }
    
    case actionTypes.ERROR:
      return {
        ...state,
        error: {...data}
      }

    case actionTypes.SUCCESS:
      return {
        ...state,
        success: data
      }

    default:
      return state
  }
}