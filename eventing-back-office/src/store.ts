/* eslint-disable no-restricted-syntax */
import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  AnyAction,
  createStore,
} from '@reduxjs/toolkit';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import authReducer from 'slices/auth/authSlice';
import globalReducer from 'slices/global/globalSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

function reducer(state: RootState, action: AnyAction) {
  if (action.type === HYDRATE) {
    const nextState: RootState = {
      ...state,
      ...action.payload, // apply delta from hydration
    };

    // keep client side state
    // here we should check on what parts of the state are needed
    // when the page will render from the server side
    nextState.auth = state.auth;
    return nextState;
  }
  return rootReducer(state, action);
}

function makeStore(context: Context) {
  return configureStore({
    reducer,
  });
}

export const wrapper = createWrapper<RootState>(makeStore);
