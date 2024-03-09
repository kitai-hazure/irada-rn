import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';

type AddAddressToContactOptions = {
  address: string;
  contactId: string;
};

type DeleteAddressFromContactOptions = {
  contactId: string;
};

export type ContactSliceData = {
  contactMap: {
    [key: string]: {
      address: string;
    };
  };
  addressMap: {
    [key: string]: {
      contactId: string;
    };
  };
};

const initialState: ContactSliceData = {
  contactMap: {},
  addressMap: {},
};

const contactSlice = createSlice({
  name: REDUX_STORE.CONTACT,
  initialState,
  reducers: {
    addAddressToContact: (
      state,
      action: PayloadAction<AddAddressToContactOptions>,
    ) => {
      const {address} = action.payload;
      const contactId = action.payload.contactId;
      state.contactMap[contactId] = {address};
      state.addressMap[address] = {contactId};
    },

    deleteAddressFromContact: (
      state,
      action: PayloadAction<DeleteAddressFromContactOptions>,
    ) => {
      const contactId = action.payload.contactId;
      const {address} = state.contactMap[contactId];
      delete state.contactMap[contactId];
      delete state.addressMap[address];
    },
    clearContacts: state => {
      state.contactMap = {};
      state.addressMap = {};
    },
  },
});

export const selectContactMap = (state: {[key: string]: ContactSliceData}) =>
  state[REDUX_STORE.CONTACT].contactMap;
export const selectAddressMap = (state: {[key: string]: ContactSliceData}) =>
  state[REDUX_STORE.CONTACT].addressMap;

export const {addAddressToContact, deleteAddressFromContact, clearContacts} =
  contactSlice.actions;

export default contactSlice.reducer;
