import * as actionTypes from '../actionTypes/invoiceActionTypes';

export const createInvoice = (invoice) => ({
  type: actionTypes.CREATE_INVOICE,
  payload: invoice,
});

export const editInvoice = (invoice) => ({
  type: actionTypes.EDIT_INVOICE,
  payload: invoice,
});

export const deleteInvoice = (invoiceId) => ({
  type: actionTypes.DELETE_INVOICE,
  payload: { id: invoiceId },
});
