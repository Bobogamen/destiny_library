import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Notification = ({ input }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [closeNotificaion, setCloseNotificaion] = useState(false);
    const [message, setMessage] = useState(null);
    const [bgClass, setBgClass] = useState(null);
    const { t } = useTranslation();

    const handleCloseNotification = () => {
        const timer = setTimeout(() => {
            setCloseNotificaion(true)
        }, 5000)

        return () => clearTimeout(timer);
    }

    useEffect(() => {
        if (input !== null) {
            switch (input) {
                case 'add':
                    setMessage(t('Add successful'));
                    setBgClass('bg-success')
                    break;
                case 'change':
                    setMessage(t('Change successful'));
                    setBgClass('bg-success')
                    break;
                case 'book-delete':
                    setMessage(t('The book has been deleted'));
                    setBgClass('bg-danger')
                    break;
                case 'author-delete':
                    setMessage(t('Author and his books deleted'));
                    setBgClass('bg-danger')
                    break;
                case 'error':
                    setMessage(t('Error sending data'));
                    setBgClass('bg-danger')
                    break;
                default:
                    setMessage(null);
            }

            setShowNotification(true);
            handleCloseNotification();
        } else {
            setShowNotification(false);
        }
    }, [input, t]);

    return (
        showNotification ? (
            <div className={`notification ${closeNotificaion ? 'close' : ''}`}>
                <span className={`${bgClass} text-light border border-dark border-1 rounded px-1 mt-2`}>{message}</span>
            </div>
        ) : null
    );
}

export default Notification;