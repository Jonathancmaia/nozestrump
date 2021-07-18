import { actionTypes } from '../actions/register.action';

const initialState = {
  user: {
    'name': '',
    'email': '',
    'password': '',
    'cpf': '',
    'tel': '',
    'conf_password': ''
  },
  success: false,
  error: {}
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.CHANGE:
      console.log(state.user)
      return {
        ...state,
        user: {
          ...state.user,
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