import { StatusBarContainer } from "./index.styles";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

const StatusBar = () => {
  const [isOnline, isVisible] = useOnlineStatus();

  return (
    <>
      {isVisible ? (
        <StatusBarContainer>
          <span>
            {isOnline
              ? "Internet connection has been re-established"
              : "Internet connection lost"}
          </span>
        </StatusBarContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatusBar;
