import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';

type ThemeType = 'dark' | 'light';

interface ThemeSliceData {
  theme: ThemeType;
}

const initialState = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: REDUX_STORE.THEME,
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<{theme: ThemeType}>) => {
      state.theme = action.payload.theme;
    },
  },
});

type ReturnTypeState = {[key: string]: ThemeSliceData};
export const selectTheme = (state: ReturnTypeState) => state[REDUX_STORE.THEME];

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
