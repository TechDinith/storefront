import { useCallback, useEffect, useState } from "react";
import {
  iMessage,
  iNotifyUseProps,
  SnackbarMessage,
} from "./notify.interfaces";
import ConsecutiveSnackbars from "./notify.template";

const NotifyUse = ({ messageProps }: iNotifyUseProps) => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [notiMessage, setNotiMessage] = useState<iMessage>({
    message: "",
    severity: "info",
  });

  const handleNotificationClick = useCallback(() => {
    setNotiMessage({
      message: messageProps?.message as string,
      severity: messageProps?.severity,
    });
    setSnackPack((prev) => [
      ...prev,
      { message: messageProps?.message as string, key: new Date().getTime() },
    ]);
  }, [messageProps]);

  useEffect(() => {
    if (messageProps) {
      handleNotificationClick();
    }
  }, [messageProps, handleNotificationClick]);

  return (
    <ConsecutiveSnackbars
      message={notiMessage}
      setSnackPack={setSnackPack}
      snackPack={snackPack}
    />
  );
};

export default NotifyUse;
