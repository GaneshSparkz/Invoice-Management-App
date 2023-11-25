import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
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
        <Link to={'/create'}>
          <Button variant="success">
            <BiLayerPlus size="1.5em" style={{ marginTop: '-0.2em' }} />&nbsp;
            Create Invoice
          </Button>
        </Link>
      </div>
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeInvoice}
        invoice={selectedInvoice}
      />
      <Table>
        <thead>
          <tr>
            <th>Invoice Number</th>
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
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.billTo}</td>
                <td>{invoice.billFrom}</td>
                <td>{invoice.dateOfIssue}</td>
                <td>{invoice.total}</td>
                <td className="text-center">
                  <Button variant="info" className="m-1" onClick={() => {handleViewInvoice(invoice)}}>
                    <BiShowAlt size="1.2em" style={{ marginTop: '-0.2em' }} />&nbsp;
                    View
                  </Button>
                  <Link to={`/edit/${invoice.id}`}>
                    <Button variant="primary" className="m-1">
                      <BiEdit size="1.2em" style={{ marginTop: '-0.2em' }} />&nbsp;
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" className="m-1" onClick={() => {handleDeleteInvoice(invoice.id)}}>
                    <BiTrash size="1.2em" style={{ marginTop: '-0.2em' }} />&nbsp;
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {invoices.length === 0 && (
        <h6 className="text-center">No invoices found! Create one to view.</h6>
      )}
    </div>
  );
}

export default InvoiceList;
