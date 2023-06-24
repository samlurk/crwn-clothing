import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Navigation from "./routes/Navigation";
import Auth from "./containers/Auth";
import Shop from "./routes/Shop";
import Checkout from "./containers/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken } from "./store/Auth/selector";
import { checkUserSession } from "./store/Auth/reducer";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(checkUserSession(token));
    }
  }, []);

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
