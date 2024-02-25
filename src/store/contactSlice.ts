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
};

const initialState: ContactSliceData = {
  contactMap: {},
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
    },

    deleteAddressFromContact: (
      state,
      action: PayloadAction<DeleteAddressFromContactOptions>,
    ) => {
      const contactId = action.payload.contactId;
      delete state.contactMap[contactId];
    },
  },
});

export const selectContactMap = (state: {[key: string]: ContactSliceData}) =>
  state[REDUX_STORE.CONTACT].contactMap;

export const {addAddressToContact, deleteAddressFromContact} =
  contactSlice.actions;

export default contactSlice.reducer;
