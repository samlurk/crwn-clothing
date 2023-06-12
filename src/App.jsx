import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Navigation from "./routes/Navigation";
import Auth from "./containers/Auth";
import Shop from "./routes/Shop";
import Checkout from "./containers/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "./store/User/action";
import jwtDecode from "jwt-decode";
import { selectIsAuthenticated, selectToken } from "./store/Auth/selector";
import { logout } from "./store/Auth/action";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setCurrentUser(jwtDecode(token)));
    } else dispatch(logout());
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
