import { Http } from '../../config/Http';
import { changeLoading } from './loading.action';
import { changeNotify} from './notify.action';

export const actionTypes = {
  CHANGE: 'PROBLEM_CHANGE',
  ERROR: 'PROBLEM_ERROR',
  SUCCESS: 'PROBLEM_SUCCESS'
}

export const changeProblem = (data) => ({
  type: actionTypes.CHANGE,
  data
})

export const errorProblem = (data) => ({
  type: actionTypes.ERROR,
  data
})

export const successProblem = (data) => ({
  type: actionTypes.SUCCESS,
  data
})



export const enviarProblema = data => dispatch => {
  dispatch(changeLoading({
    open: true,
    msg: 'Enviando problema...'
  }));

  return Http.post('/problem', {
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    problema: data.problema
  }).then(response => {
      dispatch( changeLoading({open: false}) );
      
      if(typeof response !== 'undefined'){
        dispatch( changeNotify({
          open: true,
          class: 'success',
          msg: 'Enviado com sucesso.'
        }) );
      }
    }).catch(error => {
      dispatch( changeLoading({open: false}) );
      if(error.response){
        dispatch( changeNotify({
          open: true,
          class: 'danger',
          msg: 'Algo deu errado, por favor contacte o suporte.'
        }) );
      }
    })
}