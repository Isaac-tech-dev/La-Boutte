// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {} from '../types';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'cmsApi',
  baseQuery: fetchBaseQuery({baseUrl: ``, method: 'post'}),
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {} = api;
