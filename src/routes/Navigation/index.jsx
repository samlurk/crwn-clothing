import { Outlet } from "react-router-dom";
import CrwnLogo from "../../assets/crown.svg";
import CartIcon from "../../components/Cart/CartIcon";
import CartDropdown from "../../components/Cart/CartDropdown";
import {
  NavigationContainer,
  NavigationList,
  NavigationItem,
  NavigationLink,
  Header,
  LogoContainer,
} from "./index.styles";
import { signOutStart } from "../../store/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/Auth/selector";
import { selectIsCartOpen } from "../../store/Cart/selector";

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectToken);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutHandler = () => dispatch(signOutStart());

  return (
    <>
      <Header>
        <NavigationLink to="/">
          <LogoContainer src={`${CrwnLogo}`} />
        </NavigationLink>
        <NavigationContainer>
          <NavigationList>
            <NavigationItem>
              <NavigationLink to="/shop">Shop</NavigationLink>
            </NavigationItem>
            {isAuthenticated ? (
              <NavigationItem>
                <NavigationLink as="span" onClick={signOutHandler}>
                  Sign Out
                </NavigationLink>
              </NavigationItem>
            ) : (
              <NavigationItem>
                <NavigationLink to="/auth">Sign In</NavigationLink>
              </NavigationItem>
            )}
            <NavigationItem>
              <CartIcon />
            </NavigationItem>
            {isCartOpen && <CartDropdown />}
          </NavigationList>
        </NavigationContainer>
      </Header>

      <Outlet />
    </>
  );
};

export default Navigation;
