import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Table } from 'react-bootstrap';
import { BiLayerPlus, BiShowAlt, BiEdit, BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import InvoiceModal from '../components/InvoiceModal';
import { EMPTY_INVOICE } from '../constants/invoiceConstants';
import { deleteInvoice } from '../redux/actions/invoiceActions';

const InvoiceList = () => {
  const invoices = useSelector((state) => state.invoices);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(EMPTY_INVOICE);
  const dispatch = useDispatch();

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsOpen(true);
  };

  const closeInvoice = (e) => {
    setIsOpen(false);
    setSelectedInvoice(EMPTY_INVOICE);
  };

  const handleDeleteInvoice = (id) => {
    dispatch(deleteInvoice(id));
  };

  return (
    <div>
      <div className="mt-5 mb-4 d-flex align-items-center justify-content-between">
        <h2>Invoices</h2>
        <Link to={'/create'} style={{ textDecoration: 'none' }}>
          <Button variant="success" className="d-block w-100">
            <BiLayerPlus size="1.5em" style={{ marginTop: '-0.2em' }} className="me-1" />Create Invoice
          </Button>
        </Link>
      </div>
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeInvoice}
        invoice={selectedInvoice}
      />
      <Table striped hover>
        <thead>
          <tr>
            <th className="text-center">Invoice Number</th>
            <th>Bill To</th>
            <th>Bill From</th>
            <th>Due Date</th>
            <th>Total Amount</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr id={invoice.id} key={invoice.id}>
                <td className="text-center">{invoice.invoiceNumber}</td>
                <td>{invoice.billTo}</td>
                <td>{invoice.billFrom}</td>
                <td>{invoice.dateOfIssue}</td>
                <td>{invoice.currency} {invoice.total}</td>
                <td className="text-center">
                  <Button variant="info" className="m-1" onClick={() => {handleViewInvoice(invoice)}}>
                    <BiShowAlt size="1.2em" style={{ marginTop: '-0.2em' }} className="me-1" />View
                  </Button>
                  <Link to={`/edit/${invoice.id}`}>
                    <Button variant="primary" className="m-1">
                      <BiEdit size="1.2em" style={{ marginTop: '-0.2em' }} className="me-1" />Edit
                    </Button>
                  </Link>
                  <Button variant="danger" className="m-1" onClick={() => {handleDeleteInvoice(invoice.id)}}>
                    <BiTrash size="1.2em" style={{ marginTop: '-0.2em' }} className="me-1" />Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {invoices.length === 0 && (
        <Alert variant="warning" className="text-center">
          No invoices found! <Link to={'/create'} className="alert-link">Create</Link> one to view.
        </Alert>
      )}
    </div>
  );
}

export default InvoiceList;
