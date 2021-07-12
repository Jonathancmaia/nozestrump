import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { changeAlert } from '../../store/actions/alert.action';
import { MdError, MdCheckCircle } from 'react-icons/md';
import { Typography, Modal } from '@material-ui/core';


export default function Alert(){
  const dispatch = useDispatch();
  const alert = useSelector(state => state.Alert);

  if (alert.open){
    setTimeout(()=>{
      dispatch( changeAlert({open:false}))
    }, alert.time)
  }

  return (
    <Modal
      open={alert.open}
      onClose={()=>dispatch( changeAlert({open: false}))}
      className = "d-flex flex-column align-items-center justify-content-center h-100"
    >

      <div className='bg-white rounded-lg d-flex align-items-center outline-none p-4'>
        <Typography className='font-weight-bold' variant='subtitle2'>
          {(alert.class === 'success') &&
            <MdCheckCircle style={{fontSize: '2.5rem'}} className='mr-3 text-success'/>
          }
          {(alert.class === 'error') &&
            <MdError style={{fontSize: '2.5rem'}} className='mr-3 text-danger'/>
          }
          {alert.msg}
        </Typography>
      </div>
    </Modal>
  )
}