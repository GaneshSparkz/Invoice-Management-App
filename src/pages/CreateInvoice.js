import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import { EMPTY_INVOICE } from '../constants/invoiceConstants';
import { createInvoice } from '../redux/actions/invoiceActions';

export const CreateInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = (invoice) => {
    dispatch(createInvoice(invoice));
    navigate('/');
  };
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <InvoiceForm invoice={EMPTY_INVOICE} onSave={handleSave} />
    </div>
  );
};

export default CreateInvoice;
