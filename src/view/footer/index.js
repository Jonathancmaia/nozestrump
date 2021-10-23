import style from './style.css';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { changeProblem, enviarProblema } from '../../store/actions/problem.action';
import { useSelector, useDispatch } from "react-redux";
import { mask, unMask } from 'remask';
export default function Footer() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { problem, error, success } = useSelector (state => state.Problem);

  return (
    <>
      <div className='container-fluid footer-container'>
        <div class='row d-flex justify-content-center p-3'>
          <small>
            Todos os direitos reservados.
          </small>
        </div>
        <div class='row'>
          <div class='col-md-6'>
            <div className='row'>
              <div class='col-12 d-flex justify-content-center p-3'>
                <h3>
                  Contato
                </h3>
              </div>
            </div>
            <div className='row'>
              <div class='col-md-12 d-flex justify-content-center p-3'>
                <div class='col-4 d-flex justify-content-end'>
                  <WhatsAppIcon /> 
                </div>
                <div class='col-8 d-flex justify-content-center'>
                  +55 21 97018-7035
                </div>
              </div>
                <div class='col-12 d-flex justify-content-center p-3'>
                  <div class='col-4 d-flex justify-content-end'>
                    <EmailIcon />
                  </div>
                  <div class='col-8 d-flex justify-content-center'>
                    nozestrump@gmail.com
                  </div>
                </div>
              </div>
          </div>
          <div class='col-md-6'>
            <div className='row'>
              <div class='col-12 d-flex justify-content-center p-3'>
                <h3>
                 Links úteis
                </h3>
              </div>
            </div>
            <div class='row'>
              <div class='col-12'>
                <center>
                  <a onClick={handleShow} id='link-report'>
                    Relate seu problema ou bug
                  </a>
                </center>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Relatar problema com pedido</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group
                      className="mb-3"
                      controlId="informacoes"
                    >
                      <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          error = {error.email && true}
                          margin = 'normal'
                          label = 'Email'
                          value = {problem.email}
                          type = 'email'
                          autoComplete = 'email'
                          onChange = {text => {
                            dispatch( changeProblem({ email: text.target.value }));
                            error.email && delete error.email
                          }}
                          fullWidth
                        />
                      {error.email && 
                        <strong className='text-danger'>{error.email[0]}</strong>
                      }
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        error = {error.nome && true}
                        margin = 'normal'
                        label = 'Nome'
                        value = {problem.nome}
                        type = 'nome'
                        autoComplete = 'name'
                        onChange = {text => {
                          dispatch( changeProblem({ nome: text.target.value }));
                            error.nome && delete error.nome
                          }}
                        fullWidth
                        />
                      {error.nome && 
                        <strong className='text-danger'>{error.nome[0]}</strong>
                      }
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        error = {error.telefone && true}
                        margin = 'normal'
                        label = 'Telefone'
                        value = {mask(problem.telefone,['(99) 99999-9999'])}
                        type = 'telefone'
                        autoComplete = 'telephone'
                        onChange = {text => {
                          dispatch( changeProblem({ 
                            telefone: unMask(text.target.value) 
                          }));
                            error.telefone && delete error.telefone
                          }}
                        fullWidth
                        />
                      {error.telefone && 
                        <strong className='text-danger'>{error.telefone[0]}</strong>
                      }
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Relate seu problema</Form.Label>
                      <Form.Control
                        error = {error.problema && true}
                        margin = 'normal'
                        label = 'Problema'
                        value = {problem.problema}
                        type = 'problema'
                        rows = '3'
                        as="textarea"
                        autoComplete = 'problema'
                        onChange = {text => {
                          dispatch( changeProblem({ problema: text.target.value }));
                            error.problema && delete error.problema
                          }}
                        fullWidth
                        />
                      {error.problema && 
                        <strong className='text-danger'>{error.problema[0]}</strong>
                      }
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button 
                      variant="primary"
                      onClick={(e)=>(dispatch( enviarProblema(problem) )) }
                    >
                      Enviar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}