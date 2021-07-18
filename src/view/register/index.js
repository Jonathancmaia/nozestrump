import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { changeRegister, register } from '../../store/actions/register.action';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { style } from './style.css';
import { mask, unMask } from 'remask';

export default function Register(props) {

  const dispatch = useDispatch();
  const { user, error, success } = useSelector(state => state.Register);

  //Abertura e fechamento do modal
  const [open, setOpen] = useState();

  useEffect( ()=>{

    if (props.open === undefined){
      //faz nada kkk
    } else if (props.open === true) {
      setOpen(true);
    }
  },[props.open] );

  const handleClose = () => {
    setOpen(false);
  }

  // Conferência das senhas e valida o formulario
  const [errorConfPassword, setErrorConfPassword] = useState(false);

  useEffect(()=>{
    if (user.password !== user.conf_password){
      setErrorConfPassword(true);
    } else {
      setErrorConfPassword(false);
    }
  },[user.conf_password]);

  useEffect(()=>{
    if (user.password !== user.conf_password){
      setErrorConfPassword(true);
    } else {
      setErrorConfPassword(false);
    }
  },[user.password]);

  return (
    <Modal show={open} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <h2>
          Cadastre-se
        </h2>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <TextField
                error = {error.name && true}
                margin = 'normal'
                label = 'Nome Completo'
                value = {user.name}
                onChange = {text => {
                  dispatch( changeRegister({ name: text.target.value }));
                  error.name && delete error.name;
                }}
                fullWidth
              />
              {error.name && 
                <strong className='text-danger'>{error.name[0]}</strong>
              }
            </Col>
            <Col>
              <TextField
                error = {error.cpf && true}
                margin = 'normal'
                label = 'Cpf'
                value = {mask(user.cpf, ['999.999.999-99'])}
                onChange = {text => {
                  dispatch( changeRegister({ cpf: unMask(text.target.value) }));
                  error.cpf && delete error.cpf;
                }}
                fullWidth
              />
              {error.cpf && 
                <strong className='text-danger'>{error.cpf[0]}</strong>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                error = {error.email && true}
                margin = 'normal'
                label = 'Email'
                value = {user.email}
                type = 'email'
                autoComplete = 'email'
                onChange = {text => {
                  dispatch( changeRegister({ email: text.target.value }));
                  error.email && delete error.email
                }}
                fullWidth
              />
              {error.email && 
                <strong className='text-danger'>{error.email[0]}</strong>
              }
            </Col>
            <Col>
              <TextField
                error = {error.tel && true}
                margin = 'normal'
                label = 'Telefone'
                value = {mask(user.tel,['(99) 99999-9999'])}
                type = 'text'
                onChange = {text => {
                  dispatch( changeRegister({ tel: unMask(text.target.value) }));
                  error.tel && delete error.tel
                }}
                fullWidth
              />
              {error.tel && 
                <strong className='text-danger'>{error.tel[0]}</strong>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                error = {error.password && true}
                margin = 'normal'
                label = 'Senha'
                type = 'password'
                value = {user.password}
                onChange = {text => {
                  dispatch( changeRegister({ password: text.target.value }));
                  error.password && delete error.password;
                }}
                fullWidth
              />
              {error.password && 
                <strong className='text-danger'>{error.password[0]}</strong>
              }
            </Col>
            <Col>
              <TextField
                error = {errorConfPassword && true}
                margin = 'normal'
                label = 'Confirme a Senha'
                type = 'password'
                value = {user.conf_password}
                onChange = {text => {
                  dispatch( changeRegister({ conf_password: text.target.value }));
                }}
                fullWidth
              />
              {errorConfPassword && 
                <strong className='text-danger'>
                  A senha digitada não é igual a primeira.
                </strong>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={errorConfPassword}
                variant = 'contained'
                color = 'primary'
                fullWidth
                size = 'large'
                className = 'mt-4 mb-4'
                onClick = {() => dispatch( register(user) )}
              >
               Cadastrar
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                className='text-center logue-se'
                onClick={(e)=>{handleClose()}}
              >
                Já tem conta? Faça o Login
              </div>
              {(success) && window.location.reload()}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}