import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./UserAuth/AuthReducer";
import dataReducer from "./Data/DataReducer";

const store = configureStore({
  reducer: {
    authReducer,
    dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: {
    trace: true,
    traceLimit: 25,
  },
});

export default store;
