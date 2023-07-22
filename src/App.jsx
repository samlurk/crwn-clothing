import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Navigation from "./routes/Navigation";
import Auth from "./containers/Auth";
import Shop from "./routes/Shop";
import Checkout from "./containers/Checkout";
import StatusBar from "./components/StatusBar";
import { useCheckUserSession } from "./hooks/Auth/useCheckUserSession";
import { useSignIn } from "./hooks/Auth/useSignIn";
import { useSignOut } from "./hooks/Auth/useSignOut";

const App = () => {
  const [isSignIn, isSignOut, isSignInFirstTime] = useCheckUserSession();
  useSignIn(isSignIn, isSignInFirstTime);
  useSignOut(isSignOut);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Auth />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
      <StatusBar />
    </>
  );
};

export default App;
