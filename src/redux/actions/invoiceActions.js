import * as actionTypes from '../actionTypes/invoiceActionTypes';

/**
 * Creates and returns CREATE_INVOICE action object to be dispatched based on the invoice payload
 * @param {any} invoice invoice payload
 * @returns CREATE_INVOICE action object to be dispatched
 */
export const createInvoice = (invoice) => ({
  type: actionTypes.CREATE_INVOICE,
  payload: invoice,
});

/**
 * Creates and returns EDIT_INVOICE action object to be dispatched based on the invoice payload
 * @param {any} invoice invoice payload
 * @returns EDIT_INVOICE action object to be dispatched
 */
export const editInvoice = (invoice) => ({
  type: actionTypes.EDIT_INVOICE,
  payload: invoice,
});

/**
 * Creates and returns DELETE_INVOICE action object to be dispatched based on the invoice ID
 * @param {string} invoiceId invoice ID of the invoice to be deleted
 * @returns DELETE_INVOICE action object to be dispatched
 */
export const deleteInvoice = (invoiceId) => ({
  type: actionTypes.DELETE_INVOICE,
  payload: { id: invoiceId },
});
