import React,{ useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { HttpAuth } from '../../../config/Http';
import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { index } from '../../../store/actions/me.action';
import { useSelector, useDispatch } from 'react-redux';
import { changeNotify } from '../../../store/actions/notify.action';

export default function Endereco(props) {

  const dispatch = useDispatch();
  const me = useSelector (state => state.Me);

  //Mecanismo de abertura e fechamento do modal
  const [open, setOpen] = useState(false);

  //Mecanismo para testar sucesso na função de CEP
  const [consultaCepIsSucceful, setConsultaCepIsSucceful] = useState(true); 

  //Constantes para endereço
  const [qtdEndereco, setQtdEndereco] = useState(1);
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    referencia: ''
  });

  //valores dos inputs
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [referencia, setReferencia] = useState('');
  const [sn, setSn] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [cepLoading, setCepLoading] = useState(true);
  const [cepIsValid, setCepIsValid] = useState(undefined);
  const [cepIsInvalid, setCepIsInvalid] = useState(undefined);
  const [enderecoSetadoByCep, setEnderecoSetadoByCep] = useState({
    rua: undefined,
    bairro: undefined,
    cidade: undefined,
    estado: undefined
  });

  let ruaChecked = undefined;
  let bairroChecked = undefined;
  let cidadeChecked = undefined;
  let estadoChecked = undefined;

  const [pac, setPac] = useState(0);
  const [sedex, setSedex] = useState(0);
  const [tipoEnvio, setTipoEnvio] = useState('pac');
  const [freteLoading, setFreteLoading] = useState(true);

  const setClickSn = (e)=>{
    if (sn === false){
      setSn(true);
    } else {
      setSn(false);
    }
  }

  useEffect(()=>{
    setRua(endereco.rua);
    setNumero(endereco.numero);
    setComplemento(endereco.complemento);
    setBairro(endereco.bairro);
    setCep(endereco.cep);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);
    setReferencia(endereco.referencia);
  },[endereco]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if (sn === true) {
      setNumero('');
    }
  },[sn])

  useEffect(()=>{
    if (props.open){
      setOpen(true);
      buscaEndereco();
    }
  },[props.open]);

  //Função de consulta o cep
  function consultaCep(){
    HttpAuth.post('frete', {
      cep: cep
    }).then(
      (response) => {
        
        if (response === undefined || response === '' || response === [] || response.data[0].error.code !== undefined || response.data[1].error.code !== undefined){

          setConsultaCepIsSucceful(!consultaCepIsSucceful);

        } else {

          setSedex(response.data[0]);
          setPac(response.data[1]);
          setFreteLoading(false);

        }
      }
    );
  }

  //Sempre que a função de cnsulta cep for má sucedida, será executada novamente
  useEffect(()=>{
    consultaCep();
  },[consultaCepIsSucceful]);

  useEffect(()=>{
    setCepIsValid(undefined);
    setCepIsInvalid(undefined);

    if (cep !== undefined){
      if (cep.length === 8){

        //consulta local do cep

        setCepLoading(true);
        
        const linkCep = 'https://viacep.com.br/ws/'+cep+'/json/unicode/';

        Axios.get(linkCep).then(response => {
          if(response.data.cep === undefined){
            setCepIsInvalid(true);
          } else {

            //consulta o frete

            setFreteLoading(true);

            consultaCep();

            setCepIsValid(true);
            setEndereco({
              rua: response.data.logradouro,
              numero: numero,
              complemento: complemento,
              bairro: response.data.bairro,
              cep: cep,
              cidade: response.data.localidade,
              estado: response.data.uf,
              referencia: referencia
            })
            
            if (response.data.logradouro !== undefined || response.data.logradouro !== ''){
              ruaChecked = true;
            } else {
              ruaChecked = false;
            }

            if (response.data.bairro !== undefined || response.data.bairro !== ''){
              bairroChecked = true;
            } else {
              bairroChecked = false;
            }

            if (response.data.localidade !== undefined || response.data.localidade !== ''){
              cidadeChecked = true;
            } else {
              cidadeChecked = false;
            }

            if (response.data.uf !== undefined || response.data.uf !== ''){
              estadoChecked = true;
            } else {
              estadoChecked = false;
            }

            setEnderecoSetadoByCep({
              rua: ruaChecked,
              bairro: bairroChecked,
              cidade: cidadeChecked,
              estado: estadoChecked
            });

          }

          setCepLoading(false);
        })
        
      }
    }

    
  },[cep])

  function buscaEndereco (){
    HttpAuth.get('cliente/'+props.id+'/endereco').then(
      (response) => {
        
        if (typeof response.data.numero !== 'undefined') {

          setQtdEndereco(response.data.length);

          setEndereco({
            rua: rua,
            numero: response.data[qtdEndereco-1].numero,
            complemento: response.data[qtdEndereco-1].complemento,
            bairro: bairro,
            cep: response.data[qtdEndereco-1].cep,
            cidade: cidade,
            estado: estado,
            referencia: response.data[qtdEndereco-1].referencia
          });
        } else {
          setCepLoading(false);
        }
      }
    );
  }

  //Payment call (pagseguro)
  function payment(){

    setFreteLoading(true);

    let cart = localStorage.getItem('storeCart');

    if ((typeof cart !== 'undefined' || cart !== '' || cart !== [])){
        
      let itemsIdQtd = [];

      //LOGICA DE ADICINAR OS IDS DO CARRINHO
      for (let i = 0; i < JSON.parse(cart).length; i++){
    
        itemsIdQtd = [...itemsIdQtd, {
          itemId: JSON.parse(cart)[i].id,
          itemQuantity: JSON.parse(cart)[i].qtd,
          itemTam: JSON.parse(cart)[i].tamanho
        }];
      }

      let endereco = {
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        referencia: referencia,
        tipo: tipoEnvio
      };
        
      localStorage.removeItem('storeCart');

      const pedido = {
        items: JSON.stringify(itemsIdQtd),
        endereco: JSON.stringify(endereco)
      };

      HttpAuth.post('checkout', pedido).then(
        (response) => {
          window.location = response.data;
        }
      );

    } else {

      dispatch( changeNotify({
        open: true,
        class: 'error',
        msg: 'Seu carrinho está vazio.'
      }));
    }
  }

  return (<>
    <Modal show={open} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <h2>
            Endereço de entrega
          </h2>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="endereco">
                    <Row>
                      <Col md="6">
                        <Form.Label>Cep</Form.Label>
                        <Form.Control 
                        size='sm'
                        type="text"
                        placeholder="12345123" 
                        value={cep}
                        onChange={text => setCep(text.target.value)}
                        disabled={cepLoading && true}
                        isValid={cepIsValid}
                        isInvalid={cepIsInvalid}
                        />
                        {
                          cepLoading ? 
                            <CircularProgress/>
                              :
                            <Form.Text className="text-muted">
                              Caso não saiba seu cep: 
                              <a
                                href='https://buscacepinter.correios.com.br/app/endereco/index.php'
                              >
                                Pesquise seu cep
                              </a>
                            </Form.Text>
                        }
                        
                      </Col>
                      <Col md="6">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control
                          size='sm'
                          type="text"
                          placeholder="Rua ciclano da silva"
                          value={rua}
                          onChange={text => setRua(text.target.value)}
                          disabled={enderecoSetadoByCep.rua}
                        />
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          size='sm'
                          type="number"
                          placeholder="10"
                          value={numero}
                          onChange={text => setNumero(text.target.value)}
                          disabled={sn}
                          
                        />
                        <Form.Check 
                          type="switch"
                          id="isSemNumero"
                          label="s/n"
                          value={sn}
                          onClick={(e) => setClickSn()}
                        />
                      </Col>
                    </Row>
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control
                      size='sm'
                      type="text"
                      placeholder="Ap 1001"
                      value={complemento}
                      onChange={text => setComplemento(text.target.value)}
                    />
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      size='sm'
                      type="text"
                      placeholder="Bairro das flores"
                      value={bairro}
                      onChange={text => setBairro(text.target.value)}
                      disabled={enderecoSetadoByCep.bairro}
                    />
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      size='sm'
                      type="text"
                      placeholder="Cidade dos Anjos"
                      value={cidade}
                      onChange={text => setCidade(text.target.value)}
                      disabled={enderecoSetadoByCep.cidade}
                    />
                    <Form.Label>Estado / UF</Form.Label>
                    <Form.Control
                      size='sm'
                      type="text"
                      placeholder="BA"
                      value={estado}
                      onChange={text => setEstado(text.target.value)}
                      disabled={enderecoSetadoByCep.estado}
                    />
                    <Form.Label>Referencia</Form.Label>
                    <Form.Control
                      size='sm'
                      type="text"
                      placeholder="Próximo à praça"
                      value={referencia}
                      onChange={text => setReferencia(text.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Row>
                    <Col className='d-flex justify-content-center align-items-center'>
                      <div key='tipoEnvio' className="mb-3">
                        <Form.Check
                          type='radio'
                          name='tipoEnvio'
                          onClick={(e)=>setTipoEnvio('pac')}
                          checked = {tipoEnvio === 'pac' ? true : false}
                        />
                      </div>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          PAC: {freteLoading ? 
                            <CircularProgress />
                              :
                            <>
                              {pac.price.toLocaleString('pt-br',{style: 'currency',currency: 'BRL'})}
                            </>
                          }
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <small>Entregue em {pac.deadline} dia(s).</small>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                      <div key='tipoEnvio' className="mb-3">
                        <Form.Check
                          type='radio'
                          name='tipoEnvio'
                          onClick={(e)=>setTipoEnvio('sedex')}
                          checked = {tipoEnvio === 'sedex' ? true : false}
                        />
                      </div>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          Sedex: {freteLoading ? 
                            <CircularProgress />
                              :
                            <>
                              {sedex.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                            </>
                          }
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <small>Entregue em {sedex.deadline} dia(s).</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
                <hr />
                <Row>
                  <Col className='d-flex justify-content-center'>
                    <Button
                      variant='success'
                      onClick={(e)=>{payment()}}
                      disabled={freteLoading}
                      size='lg'
                    >
                    Confirmar endereço e iniciar pagamento
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
  </>);
}