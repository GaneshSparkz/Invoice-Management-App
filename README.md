# Invoice Management App
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23fcfbff.svg?style=for-the-badge&logo=redux&logoColor=%23764abc) ![React-Router](https://img.shields.io/badge/react_router-%2320232a.svg?style=for-the-badge&logo=react-router&logoColor=%2361dbfb) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

An Invoice Management web application built with React and Redux. This allows you to *create*, *view*, *edit* and *delete* invoices using the integrated Redux store via actions and reducer. We can also create invoice by copying to a new invoice from an existing invoice.
(View -> Copy to New)

> Disclaimer! This application is not connected to a backend or DB. So, refreshing the page will clear the state of redux store which means that the created invoices will be lost.

The existing InvoiceForm component from [invoice-generator](https://github.com/johnuberbacher/invoice-generator) enables us to add itemized items, configure quantity, prices, tax rates and discounts. We can also Download Invoice as PDFs to your device. Uses [jspdf-react](https://www.npmjs.com/package/jspdf-react) to capture the data from the modal and covert it from canvas -> pdf.

### Live Demo
https://invoice-management-app.netlify.app

### Installation and Local setup

#### Clone the repository

```
git clone https://github.com/GaneshSparkz/Invoice-Management-App.git

cd Invoice-Management-App
```

#### Install the dependencies

```
npm install
```

#### Run the application on browser

```
npm start
```

### Screenshots

#### Homepage

<img src="https://i.imgur.com/8iGZQhs.jpg" style="max-width: 100px; width: 100%; height: auto;">
<img src="https://i.imgur.com/s0UHytz.jpg" style="max-width: 100px; width: 100%; height: auto;">

#### Create Invoice
<img src="https://i.imgur.com/XNXII2Q.jpg" style="max-width: 100px; width: 100%; height: auto;">
<img src="https://i.imgur.com/vONbpch.jpg" style="max-width: 100px; width: 100%; height: auto;">

#### Edit Invoice
<img src="https://i.imgur.com/94oZdMa.jpg" style="max-width: 100px; width: 100%; height: auto;">

#### View Invoice
<img src="https://i.imgur.com/Hrs3C7o.jpg" style="max-width: 100px; width: 100%; height: auto;">

#### Copy to New
<img src="https://i.imgur.com/9HEFpov.jpg" style="max-width: 100px; width: 100%; height: auto;">

#### Download Invoice PDF
<img src="https://i.imgur.com/9Cn10Fd.png" style="max-width: 100px; width: 100%; height: auto;">

#### Not Found pages

##### Wrong URL
<img src="https://i.imgur.com/lT8hhhR.jpg" style="max-width: 100px; width: 100%; height: auto;">

#### Wrong Invoice ID on URL
<img src="https://i.imgur.com/eOZX1lt.jpg" style="max-width: 100px; width: 100%; height: auto;">

### To-Do (Future Scope)

- [ ] Persist the invoices in redux store in `localStorage` or any other type of storage using [redux-persist](https://www.npmjs.com/package/redux-persist)

- [ ] Create a backend system and Database to store the invoices and integrate it to the frontend
