import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { selectToken } from "../../store/Auth/selector";
import { checkUserSession } from "../../store/Auth/reducer";

export const useCheckUserSession = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const [isSignInFirstTime, setIsSignInFirstTime] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const prevCounterRef = useRef(0);

  useEffect(() => {
    if (isSignInFirstTime) setIsSignInFirstTime(false);
    // Check if the user has been signed in when refresh
    if (token && prevCounterRef.current === 0) {
      dispatch(checkUserSession(token));
      if (!token) setIsSignOut(true);
      else setIsSignIn(true);
    }

    if (prevCounterRef.current >= 1) {
      // When the user signs in for the first time
      if (token) {
        setIsSignOut(false);
        setIsSignIn(true);
        setIsSignInFirstTime(true);
      }
      // When the user signs out
      if (!token) {
        setIsSignOut(true);
        setIsSignIn(false);
      }
    } else prevCounterRef.current++;
  }, [token]);

  return [isSignIn, isSignOut, isSignInFirstTime];
};
