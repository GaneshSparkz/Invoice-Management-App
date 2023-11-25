import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiCheckCircle, BiCloudDownload } from "react-icons/bi";
import generateInvoice from '../utils/generateInvoice';

const InvoiceModal = (props) => {
  return(
    <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Invoice {props.invoice.invoiceNumber || ''}</Modal.Title>
      </Modal.Header>
      <div id="invoiceCapture">
        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
          <div className="w-100">
            <h4 className="fw-bold my-2">{props.invoice.billFrom || 'Ganesh'}</h4>
            <h6 className="fw-bold text-secondary mb-1">
              Invoice #: {props.invoice.invoiceNumber||''}
            </h6>
          </div>
          <div className="text-end ms-4">
            <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
            <h5 className="fw-bold text-secondary"> {props.invoice.currency} {props.invoice.total}</h5>
          </div>
        </div>
        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed to:</div>
              <div>{props.invoice.billTo||''}</div>
              <div>{props.invoice.billToAddress||''}</div>
              <div>{props.invoice.billToEmail||''}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Billed From:</div>
              <div>{props.invoice.billFrom||''}</div>
              <div>{props.invoice.billFromAddress||''}</div>
              <div>{props.invoice.billFromEmail||''}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold mt-2">Date Of Issue:</div>
              <div>{props.invoice.dateOfIssue||''}</div>
            </Col>
          </Row>
          <Table className="mb-0">
            <thead>
              <tr>
                <th>QTY</th>
                <th>DESCRIPTION</th>
                <th className="text-end">PRICE</th>
                <th className="text-end">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {props.invoice.items.map((item, i) => {
                return (
                  <tr id={i} key={i}>
                    <td style={{width: '70px'}}>
                      {item.quantity}
                    </td>
                    <td>
                      {item.name} - {item.description}
                    </td>
                    <td className="text-end" style={{width: '100px'}}>{props.invoice.currency} {item.price}</td>
                    <td className="text-end" style={{width: '100px'}}>{props.invoice.currency} {item.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{width: '100px'}}>SUBTOTAL</td>
                <td className="text-end" style={{width: '100px'}}>{props.invoice.currency} {props.invoice.subTotal}</td>
              </tr>
              {props.invoice.taxAmmount !== '0.00' &&
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{width: '100px'}}>TAX</td>
                  <td className="text-end" style={{width: '100px'}}>{props.invoice.currency} {props.invoice.taxAmmount}</td>
                </tr>
              }
              {props.invoice.discountAmmount !== '0.00' &&
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{width: '100px'}}>DISCOUNT</td>
                  <td className="text-end" style={{width: '100px'}}>{props.invoice.currency} {props.invoice.discountAmmount}</td>
                </tr>
              }
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
                <td className="text-end" style={{width: '100px'}}>{props.invoice.currency} {props.invoice.total}</td>
              </tr>
            </tbody>
          </Table>
          {props.invoice.notes &&
            <div className="bg-light py-3 px-4 rounded">
              {props.invoice.notes}
            </div>}
        </div>
      </div>
      <div className="pb-4 px-4">
        <Row>
          <Col md={6}>
            <Button variant="success" className="d-block w-100" onClick={() => props.handleSave(props.invoice)}>
              <BiCheckCircle style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Save Invoice
            </Button>
          </Col>
          <Col md={6}>
            <Button variant="primary" className="d-block w-100 mt-3 mt-md-0" onClick={() => generateInvoice(props.invoice.invoiceNumber)}>
              <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
              Download Copy
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
