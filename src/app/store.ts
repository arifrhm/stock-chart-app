// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { polygonApi } from '@/services/polygonApi';

export const store = configureStore({
  reducer: {
    [polygonApi.reducerPath]: polygonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(polygonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;