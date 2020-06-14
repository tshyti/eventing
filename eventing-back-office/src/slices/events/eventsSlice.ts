import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventsSliceState } from './models';

const initialState: EventsSliceState = {
  loading: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    loadingEvents(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
  },
});

export const { loadingEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
