import React from 'react';
import { Typpgraphy, Modal, CircularProgress, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoading } from '../../store/actions/loading.action';

export default function Loading(){

  const dispatch = useDispatch();
  const loading = useSelector(state => state.Loading);

  return (
    <Modal 
      open={loading.open}
      onClose={()=> dispatch( changeLoading({open: false}))}
      className='d-flex justify-content-center align-items-center h-100'
    >
      <div className='bg-white d-flex align-items-center rounded-lg p-3 ontline-none'>
        <Typography variant='subtitle1'>Carregando...</Typography>
        <CircularProgress size={50} className='ml-5'/>
      </div>
    </Modal>
  )
}