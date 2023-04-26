import React from "react";
import { render } from 'react-dom';
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart.context";
import { store } from "./store/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
            <CartProvider>
              <App />
            </CartProvider>
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
