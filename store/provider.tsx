"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import agentReducer from "./slices/agentSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    agents: agentReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
