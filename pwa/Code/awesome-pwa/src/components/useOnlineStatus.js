import { useEffect, useState } from "react";

function getOnlineStatus() {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
}

export default function useOnlineStatus(handleOnline, handleOffline) {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  const goOnline = () => {
    setOnlineStatus(true);
    handleOnline && handleOnline();
  };

  const goOffline = () => {
    setOnlineStatus(false);
    handleOffline && handleOffline();
  };

  useEffect(() => {
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [goOffline, goOnline]);

  return onlineStatus;
}
