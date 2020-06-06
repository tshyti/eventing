import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalSliceState } from './models';

const initialState: GlobalSliceState = {
  isDrawerCollapsed: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsDrawerCollapsed(state, action: PayloadAction<boolean>) {
      return { ...state, isDrawerCollapsed: action.payload };
    },
  },
});

export const { setIsDrawerCollapsed } = globalSlice.actions;

export default globalSlice.reducer;
