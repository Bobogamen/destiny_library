import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAuthor } from '../api/service';
import { useTranslation } from 'react-i18next';
import Notification from './Notification';

function AddAuthor() {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [notificationInput, setNotificationInput] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        setShowButton(name.length > 2);

        if (name.length > 0) {
            setIsNameValid(true);
            if (name.length >= 3) {
                setIsNameValid(true);
            }
        }
    }, [name]);

    const addOrUpdateAuthor = async (event) => {
        event.preventDefault();

        try {
            const result = await addAuthor(name);

            if (result) {
                setNotificationInput(`add_${Date.now()}`);
                localStorage.setItem('notificationType', 'add');
                navigate('/authors');
            } else {
                setNotificationInput(`author-exist_${Date.now()}`);
            }
        } catch (error) {
            setNotificationInput(`error_${Date.now()}`);
        }
    };

    const changeNameHandler = (event) => {
        setName(event.target.value);
    };

    return (
        <div className="container my-2">
            <Notification input={notificationInput} />
            <div className="card col-md-6 offset-md-3 bg-danger-subtle">
                <div className="card-body">
                    <form>
                        <h4 className="p-0 m-0">{t('Add')} {t('Author')}</h4>
                        <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                            {t('Name')} {t('must be at least 3 symbols')}
                        </small>
                        <div className="form-group">
                            <label>{t('Name')}: </label>
                            <input
                                placeholder={t('Name')}
                                name={t('Name')}
                                value={name}
                                onChange={changeNameHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mt-4">
                            {showButton ? (
                                <button className="btn btn-success" onClick={addOrUpdateAuthor}>{t('Save')}</button>
                            ) :
                                null
                            }
                            <a href="/authors">
                                <span className="btn btn-danger" style={{ marginLeft: '0.5rem' }}>{t('Back')}</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAuthor;