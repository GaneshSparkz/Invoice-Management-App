import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InvoiceForm from '../components/InvoiceForm';
import { editInvoice } from '../redux/actions/invoiceActions';

export const EditInvoice = () => {
  const { id } = useParams();
  const invoices = useSelector((state) => state.invoices);
  const invoice = invoices.find((inv) => inv.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSave = (invoice) => {
    dispatch(editInvoice(invoice));
    navigate('/');
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <InvoiceForm invoice={invoice} onSave={handleSave} />
    </div>
  );
};

export default EditInvoice;
