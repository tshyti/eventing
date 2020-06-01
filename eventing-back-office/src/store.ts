import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import testReducer from 'slices/test/testSlice';
import authReducer from 'slices/auth/authSlice';

const rootReducer = combineReducers({
  test: testReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
