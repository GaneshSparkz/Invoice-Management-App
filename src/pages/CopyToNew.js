import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import NotFound from './NotFound';
import { createInvoice } from '../redux/actions/invoiceActions';

const CopyToNew = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices);
  const invoice = invoices.find((inv) => inv.id === id);

  const handleSave = (invoice) => {
    dispatch(createInvoice(invoice));
    navigate('/');
  };

  return invoice ? (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <InvoiceForm invoice={{ ...invoice, invoiceNumber: invoices.length + 1 }} onSave={handleSave} />
    </div>
  ) : (
    <NotFound resource={'Invoice'} />
  );
};

export default CopyToNew;
