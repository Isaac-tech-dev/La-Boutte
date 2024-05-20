import {configureStore} from '@reduxjs/toolkit';
import {api} from '../api';
import UserSlice from '../slice/UserSlice';
import {rtkQueryErrorHandler} from '../middleware/errorhandler';
import {setupListeners} from '@reduxjs/toolkit/query';
import SettingsSlice from '../slice/SettingsSlice';
import UserAccountsSlice from '../slice/UserAccountsSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    useraccounts: UserAccountsSlice,
    settings: SettingsSlice,
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware, rtkQueryErrorHandler]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
