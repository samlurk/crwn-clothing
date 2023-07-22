import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export const subscribe = (callback) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

export const useOnlineStatus = (duration = 4000) => {
  const [isVisible, setVisible] = useState(false);
  let prevCountRef = useRef(0);

  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );

  useEffect(() => {
    if (prevCountRef.current >= 1) {
      if (!isVisible) setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    } else prevCountRef.current++;
  }, [isOnline]);
  return [isOnline, isVisible];
};
