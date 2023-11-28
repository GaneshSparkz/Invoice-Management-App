import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import { EMPTY_INVOICE } from '../constants/invoiceConstants';
import { createInvoice } from '../redux/actions/invoiceActions';

const CreateInvoice = () => {
  const numberOfInvoices = useSelector((state) => state.invoices.length);
  const invoice = {
    ...EMPTY_INVOICE,
    invoiceNumber: numberOfInvoices + 1,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = (invoice) => {
    dispatch(createInvoice(invoice));
    navigate('/');
  };
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <InvoiceForm invoice={invoice} onSave={handleSave} />
    </div>
  );
};

export default CreateInvoice;
