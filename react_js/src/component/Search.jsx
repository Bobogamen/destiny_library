import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

function SearchBar() {
    let [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.length >= 3) {
            navigate(`/search/${searchQuery}`);
        } else {
            setNotification('min-symbols'); 
            localStorage.setItem('notificationType', 'min-symbols');
        }
    };

    const { t } = useTranslation();

    return (
        <>
            <Notification input={notification} />
            <div className="d-inline-flex mx-1">
                <input
                    className="w-75"
                    type="text"
                    placeholder={t('Searching')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success btn-sm mx-1" onClick={handleSearch}>
                    {t('Search')}
                </button>
            </div>
        </>
    );
}

export default SearchBar;