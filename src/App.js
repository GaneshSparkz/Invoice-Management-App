import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import InvoiceList from './pages/InvoiceList';
import CreateInvoice from './pages/CreateInvoice';
import EditInvoice from './pages/EditInvoice';
import CopyToNew from './pages/CopyToNew';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/create" element={<CreateInvoice />} />
            <Route path="/edit/:id" element={<EditInvoice />} />
            <Route path="/create/copyFrom/:id" element={<CopyToNew />} />
          </Routes>
        </Container>
      </div>
    );
  }
}

export default App;
