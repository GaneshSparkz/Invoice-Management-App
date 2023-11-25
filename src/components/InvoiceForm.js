import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

const InvoiceForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoice, setInvoice] = useState({
    ...props.invoice,
    currentDate: new Date().toLocaleDateString(),
  });

  const handleCalculateTotal = useCallback(() => {
    let items = invoice.items.slice();
    let subTotal = 0;

    items.forEach((item) => {
      subTotal = subTotal + (parseFloat(item.price).toFixed(2) * parseInt(item.quantity));
    });

    let taxAmmount = parseFloat(subTotal * (invoice.taxRate / 100)).toFixed(2);
    let discountAmmount = parseFloat(subTotal * (invoice.discountRate / 100)).toFixed(2);
    let total = ((subTotal - discountAmmount) + parseFloat(taxAmmount)).toFixed(2);

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      subTotal: parseFloat(subTotal).toFixed(2),
      taxAmmount,
      discountAmmount,
      total,
    }));
  }, [invoice.items, invoice.taxRate, invoice.discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [invoice.items, invoice.taxRate, invoice.discountRate, handleCalculateTotal]);

  const handleRowDel = (item) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((eachItem) => eachItem.id !== item.id),
    });
  };

  const handleAddEvent = (evt) => {
    let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let item = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: '1',
    };
    setInvoice({
      ...invoice,
      items: [...invoice.items, item],
    });
  }

  const onItemizedItemEdit = (evt) => {
    let itemField = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    let items = invoice.items.slice();
    let newItems = items.map(function(eachItem) {
      for (let key in eachItem) {
        if (key === itemField.name && (key + eachItem.id) === itemField.id) {
          eachItem[key] = itemField.value;
        }
      }
      return eachItem;
    });
    setInvoice({
      ...invoice,
      items: newItems,
    });
  }

  const editField = (event) => {
    setInvoice({
      ...invoice,
      [event.target.name]: event.target.value,
    });
  };

  const onCurrencyChange = (event) => {
    setInvoice({
      ...invoice,
      currency: event.target.value,
    });
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = (event) => setIsOpen(false);
  
  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{invoice.currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control type="date" value={invoice.dateOfIssue} name={"dateOfIssue"} onChange={editField} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control type="number" value={invoice.invoiceNumber} name={"invoiceNumber"} onChange={editField} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={invoice.billTo} type="text" name="billTo" className="my-2" onChange={editField} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={invoice.billToEmail} type="email" name="billToEmail" className="my-2" onChange={editField} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={invoice.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={editField} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={invoice.billFrom} type="text" name="billFrom" className="my-2" onChange={editField} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={invoice.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={editField} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={invoice.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={editField} required="required"/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={onItemizedItemEdit} onRowAdd={handleAddEvent} onRowDel={handleRowDel} currency={invoice.currency} items={invoice.items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                  <span>{invoice.currency}
                    {invoice.subTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({invoice.discountRate || 0}%)</span>
                    {invoice.currency}
                    {invoice.discountAmmount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:
                  </span>
                  <span>
                    <span className="small ">({invoice.taxRate || 0}%)</span>
                    {invoice.currency}
                    {invoice.taxAmmount || 0}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold">{invoice.currency}
                    {invoice.total || 0}</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes" value={invoice.notes} onChange={editField} as="textarea" className="my-2" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Review Invoice</Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              invoice={invoice}
              handleSave={props.onSave}
            />
            <hr className="mt-4 mb-3" />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={onCurrencyChange} className="btn btn-light my-1" aria-label="Change Currency">
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="taxRate" type="number" value={invoice.taxRate} onChange={editField} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountRate" type="number" value={invoice.discountRate} onChange={editField} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default InvoiceForm;
