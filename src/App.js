import { Suspense, useEffect, lazy } from "react";
import { useDispatch } from "react-redux/es/exports";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "./utils/firebase/firebase.utils";
// import { setCurrentUser } from "./store/user/user.action";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Spinner from "./components/spinner/spinner.component";
// import Shop from "./routes/shop/shop.component";
// import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);

const App = () => {
  const dispatch = useDispatch();
  // user is a very top level thing that matters
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
