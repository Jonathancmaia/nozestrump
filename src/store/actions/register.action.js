import { Http } from '../../config/Http';
import { changeLoading } from './loading.action';
import { changeNotify} from './notify.action';

export const actionTypes = {
  CHANGE: 'REGISTER_CHANGE',
  ERROR: 'REGISTER_ERROR',
  SUCCESS: 'REGISTER_SUCCESS'
}

export const changeRegister = (data) => ({
  type: actionTypes.CHANGE,
  data
})

export const errorRegister = (data) => ({
  type: actionTypes.ERROR,
  data
})

export const successRegister = (data) => ({
  type: actionTypes.SUCCESS,
  data
})

export const setUserToken = token => dispatch => {

  localStorage.setItem('access_token', token);

  dispatch( changeRegister({
    email: '',
    password: ''
  }) )

  dispatch( successRegister(true) )
}

export const register = data => dispatch => {
  dispatch(changeLoading({
    open: true,
    msg: 'Cadastrando usuário...'
  }));

  return Http.post('/signup', {
    name: data.name,
    email: data.email,
    password: data.password,
    cpf: data.cpf,
    tel: data.tel
  }).then(response => {
      dispatch( changeLoading({open: false}) );
      
      if(typeof response !== 'undefined'){
        if(response.data.access_token){
          dispatch( changeNotify({
            open: true,
            class: 'success',
            msg: 'Usuário cadastrado com sucesso.'
          }) )

          dispatch( setUserToken(response.data.access_token) );
        }
      }
    }).catch(error => {
      dispatch( changeLoading({open: false}) );
      if(error.response){
        dispatch( errorRegister(error.response.data.errors));
      }
    })
}