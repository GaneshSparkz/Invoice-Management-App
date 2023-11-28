import { TEST_INVOICE } from '../../constants/testConstants';
import { createInvoice, deleteInvoice, editInvoice } from './invoiceActions';
import * as actionTypes from '../actionTypes/invoiceActionTypes';

describe('Invoice Actions', () => {
  it('should create CREATE_INVOICE action', () => {
    expect(createInvoice(TEST_INVOICE)).toStrictEqual({ type: actionTypes.CREATE_INVOICE, payload: TEST_INVOICE });
  });

  it('should create EDIT_INVOICE action', () => {
    expect(editInvoice(TEST_INVOICE)).toStrictEqual({ type: actionTypes.EDIT_INVOICE, payload: TEST_INVOICE });
  });

  it('should create DELETE_INVOICE action', () => {
    expect(deleteInvoice(TEST_INVOICE.id)).toStrictEqual({ type: actionTypes.DELETE_INVOICE, payload: { id: TEST_INVOICE.id } });
  });
});
