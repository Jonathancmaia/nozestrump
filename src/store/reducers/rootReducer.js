import { combineReducers } from 'redux';
import Loading from './loading.reducer';
import Notify from './notify.reducer';
import Alert from './alert.reducer';
import Auth from './auth.reducer';
import Register from'./register.reducer';
import Items from './items.reducer';
import Me from './me.reducer';
import Cart from './cart.reducer';
import Problem from './problem.reducer';

const rootReducer = combineReducers({
  Loading,
  Notify,
  Alert,
  Auth,
  Register,
  Items,
  Me,
  Cart,
  Problem
});

export default rootReducer;