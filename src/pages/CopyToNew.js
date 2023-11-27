import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import { createInvoice } from '../redux/actions/invoiceActions';

export const CopyToNew = () => {
  const { id } = useParams();
  const invoices = useSelector((state) => state.invoices);
  const invoice = invoices.find((inv) => inv.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = (invoice) => {
    dispatch(createInvoice(invoice));
    navigate('/');
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <InvoiceForm invoice={{ ...invoice, invoiceNumber: invoices.length + 1 }} onSave={handleSave} />
    </div>
  );
};

export default CopyToNew;
