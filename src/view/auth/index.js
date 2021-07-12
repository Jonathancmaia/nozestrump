import { useState, useEffect } from 'react';
import {TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { changeAuth, loginAuth } from '../../store/actions/auth.action';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import Register from '../register';
import { style } from './style.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Auth(props){

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
  }

  useEffect( ()=>{

    if (props.opened === undefined){
      //faz nada kkk
    } else if (props.opened === true) {
      setOpen(true);
    }
  },[props.opened] )

  const dispatch = useDispatch();
  const { credentials, success } = useSelector(state => state.Auth);

  async function handleLogin(){

    //Verifica se há token de acesso, se sim, o apaga 
    if (localStorage.getItem('access_token') !== null) {
      localStorage.removeItem('access_token');
    }

    //Dispacha as credenciais ao reducer
    await dispatch( loginAuth(credentials) );

    //Cas haja um novo token de acesso, quer dizer quo login foi bem sucedido. Feito isso, a tela de login é fechada
    if (localStorage.getItem('access_token') !== null) {
      setOpen(false);
    }

  }

  //Abertura e fechamento do signUp
  const [signUpOpen, setSignUpOpen] = useState();

  
  return(
    <>
      <Register open={signUpOpen} />
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>    
          <h2 className='pl-5'>
            Faça o login
          </h2>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <TextField
                label='Email'
                type='email'
                autoComplete='email'
                margin='normal'
                fullWidth
                value={credentials.email}
                onChange={text => dispatch(changeAuth({email: text.target.value}))}
                />  
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                label='Senha'
                type='password'
                margin='normal'
                fullWidth
                value={credentials.password}
                onChange={text => dispatch(changeAuth({password: text.target.value}))}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                variant='contained'
                color='primary'
                fullWidth
                size='large'
                className='mt-4 mb-4'
                onClick={ () => handleLogin() }
                >
                  Logar
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col
                className='d-flex justify-content-center cadastre-se'
                onClick={
                  (e) => { 
                    setSignUpOpen(true);
                    setTimeout(()=>{setSignUpOpen()}, 3000);
                  }
                } 
              >
                Não tem conta? Cadastre-se!
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  )}