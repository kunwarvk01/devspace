import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import the authReducer which contains the state slice and the reducers
import authReducer from "./state";
// Import necessary modules from redux-persist to enable data persistence
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Define the configuration options for redux-persist
const persistConfig = { key: "root", storage, version: 1 };

// Create a new persisted reducer based on the original reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store using the persistedReducer and the default middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a root element for the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside a Provider and PersistGate
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
