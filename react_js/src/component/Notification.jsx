import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Notification = ({ input }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState(null);
  const [bgClass, setBgClass] = useState(null);
  const { t } = useTranslation();

  const resetNotification = () => {
    setShowNotification(false);
    setMessage(null);
    setBgClass(null);
  };

  useEffect(() => {
    if (input !== null) {
      resetNotification();

      const timer = setTimeout(() => {
        let inputType = input.split('_')[0];

        console.log(inputType);

        switch (inputType) {
          case "add":
            setMessage(t("Add successful"));
            setBgClass("bg-success");
            break;
          case "change":
            setMessage(t("Change successful"));
            setBgClass("bg-success");
            break;
          case "book-delete":
            setMessage(t("The book has been deleted"));
            setBgClass("bg-danger");
            break;
          case "author-delete":
            setMessage(t("Author and his books deleted"));
            setBgClass("bg-danger");
            break;
          case "error":
            setMessage(t("Error sending data"));
            setBgClass("bg-danger");
            break;
          case "min-symbols":
            setMessage(t("Min 3 symbols"));
            setBgClass("bg-danger");
            break;
          case "author-exist":
            setMessage(t("Author already exists"));
            setBgClass("bg-danger");
            break;
          default:
            setMessage(null);
        }
        setShowNotification(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [input, t]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        localStorage.removeItem("notificationType");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return showNotification && message ? (
    <div className="notification">
      <span className={`${bgClass} text-light border border-dark border-1 rounded px-1 mt-2`}>
        {message}
      </span>
    </div>
  ) : null;
};

export default Notification;