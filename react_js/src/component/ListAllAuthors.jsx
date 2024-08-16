import React, { useEffect, useState } from 'react';
import { getAllAuthors } from "../api/service";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';
import Notification from './Notification';

function ListAllAuthors() {
    const [loading, setLoading] = useState(true)
    const [authors, setAuthors] = useState([])
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        getAllAuthors().then(response => {
            setAuthors(response.data)
            setLoading(false)
        }).then(res => res.json)
            .catch(res => res.json)

    }, [])

    useEffect(() => {
        setNotification(localStorage.getItem('notificationType'))
    }, [notification])

    const { t } = useTranslation();

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <Notification input={notification}/>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-2 m-auto fst-italic text-bg-primary rounded-2 px-2 py-1">{t('Authors')} {authors.length}{t('pcs')}.</h2>
                <a href="/add-author">
                    <button className="btn btn-warning fw-bold">{t('Add')}</button>
                </a>
            </div>
            <div className="d-flex col-11 m-auto justify-content-center">
                {authors.length > 0 ?
                    <table className="table table-sm table-bordered text-center align-middle">
                        <thead className="h6 table-success">
                            <tr>
                                <th>{t('Title')}</th>
                                <th>{t('Books')}</th>
                            </tr>
                        </thead>
                        <tbody className="h6 table-secondary">
                            {
                                authors.map(a =>
                                    <tr key={a.id}>
                                        <td>
                                            <a href={`/author/${a.id}`}>{a.name}</a>
                                        </td>
                                        <td>{a.books}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    : <div>
                        <p className="text-bg-danger d-block width-fit-content px-1 rounded-1 m-auto">{t('The list is empty')}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default ListAllAuthors;