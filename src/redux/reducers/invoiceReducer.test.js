import { TEST_INVOICE } from '../../constants/testConstants';
import { createInvoice, deleteInvoice, editInvoice } from '../actions/invoiceActions';
import invoiceReducer, { initialState } from './invoiceReducer';

describe('Invoice Reducer', () => {
  it('should return current state if called without action', () => {
    expect(invoiceReducer(undefined, {})).toStrictEqual(initialState);
  });

  describe('with CREATE_INVOICE action', () => {
    let newState;

    beforeAll(() => {
      newState = invoiceReducer(undefined, createInvoice(TEST_INVOICE));
    });

    it('should return a new state with new invoice added', () => {
      expect(newState.invoices.length).toBe(1);
      expect(newState.invoices[0].invoiceNumber).toBe(TEST_INVOICE.invoiceNumber);
    });

    it('should create a new invoice with a new id attribute', () => {
      expect(newState.invoices[0].id).toBeDefined();
      expect(newState.invoices[0].id).not.toBe(TEST_INVOICE.id);
    });
  });

  describe('with EDIT_INVOICE action', () => {
    let newState;
    let newInvoice;

    beforeAll(() => {
      newInvoice = {
        ...TEST_INVOICE,
        billTo: 'Test3',
        billToEmail: 'Test3@test.com',
        billToAddress: 'Test3 Address',
      };
      newState = invoiceReducer({ invoices: [TEST_INVOICE] }, editInvoice(newInvoice));
    });

    it('should return a new state with same number of invoices', () => {
      expect(newState.invoices.length).toBe(1);
    });

    it('should replace the old values with the values given in payload', () => {
      expect(newState.invoices[0].billTo).toBe(newInvoice.billTo);
      expect(newState.invoices[0].billToEmail).toBe(newInvoice.billToEmail);
      expect(newState.invoices[0].billToAddress).toBe(newInvoice.billToAddress);
    });

    it('should not change the other values', () => {
      expect(newState.invoices[0].id).toBeDefined();
      expect(newState.invoices[0].id).toBe(TEST_INVOICE.id);
    });
  });

  describe('with DELETE_INVOICE action', () => {
    it('should return a new state with the given invoice removed', () => {
      const newState = invoiceReducer({ invoices: [TEST_INVOICE] }, deleteInvoice(TEST_INVOICE.id));
      expect(newState.invoices.length).toBe(0);
      expect(newState).toStrictEqual(initialState);
    });
  });
});
