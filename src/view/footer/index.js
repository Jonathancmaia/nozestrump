import style from './style.css';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

export default function Footer() {
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
              <div class='col-md-6 d-flex justify-content-center p-3'>
                <PhoneIphoneIcon /> (21) 99999-9999
              </div>
              <div class='col-md-6 d-flex justify-content-center p-3'>
                <PhoneIcon /> (21) 2222-2222
              </div>
            </div>
            <div className='row'>
                <div class='col-12 d-flex justify-content-center p-3'>
                  <EmailIcon /> aaaaaaaa@suporte.com.br
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
                <ol>
                  <li>
                    <a>Tive um problema com meu pedido</a>
                  </li>
                  <li>
                    <a>Reportar um bug</a>
                  </li>
                  <li>
                    <a>Trabalhe conosco</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}