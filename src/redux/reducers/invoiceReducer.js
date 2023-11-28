import * as actionTypes from '../actionTypes/invoiceActionTypes';

export const initialState = {
  invoices: [],
};

/**
 * Returns a new state based on the previous state according to the dispatched action
 * @param {{ invoices: any[]; }} state current state
 * @param {{ type: string; payload: any; }} action dispatched action
 * @returns {{ invoices: any[]; }} new state
 */
export default function invoiceReducer(state=initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_INVOICE:
      const newInvoice = {
        ...action.payload,
        id: Date.now().toString(),
      };
      return { invoices: [...state.invoices, newInvoice] };
    
    case actionTypes.EDIT_INVOICE:
      return {
        invoices: state.invoices.map((invoice) => (
          invoice.id === action.payload.id
            ? { ...invoice, ...action.payload }
            : invoice
        ))
      };
    
    case actionTypes.DELETE_INVOICE:
      return {
        invoices: state.invoices.filter((invoice) => (
          invoice.id !== action.payload.id
        ))
      };

    default:
      return state;
  }
}
