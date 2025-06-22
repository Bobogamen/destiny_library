import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { deleteBookById, editBookById, getBookById } from "../api/service";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function Book() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: {
            id: '',
            name: ''
        }
    });
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        getBookById(id).then((response) => {
            setBook(response.data);
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        setShowButton(book.title.length >= 3);
        setIsNameValid(book.title.length >= 3 || book.title.length === 0);
    }, [book.title]);

    const deleteBook = async () => {
        if (window.confirm(t('Are you sure?'))) {
            const deleted = await deleteBookById(id);
            if (deleted) {
                localStorage.setItem('notificationType', 'book-delete');
                navigate('/books');
            }
        }
    };

    const changeTitleHandler = (event) => {
        setBook({
            ...book,
            title: event.target.value,
        });
    };

    const editBook = async () => {
        const bookForSend = {
            id: book.id,
            title: book.title,
            author: book.author // keep current author unchanged
        };

        if (await editBookById(bookForSend)) {
            localStorage.setItem('notificationType', 'change');
            navigate('/books');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="container">
                <div className="card m-auto mt-2 mb-5 p-2 bg-dark-subtle">
                    <form className="card-body">
                        <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                            {t('Tittle')} {t('must be at least 3 symbols')}
                        </small>
                        <h2 className="fw-bold p-0 m-0">{t('Title')}:</h2>
                        <div className="d-grid">
                            <input
                                className="h4 d-inline-block text-center px-2"
                                type="text"
                                value={book.title}
                                onChange={changeTitleHandler}
                            />
                        </div>
                        <div className="d-grid width-fit-content m-auto mt-2">
                            <h3 className="fw-bold p-0 m-0">{t('Author')}:</h3>
                            <span className="fw-bold fst-italic fs-5 border border-black border-2 rounded px-2 py-1 mt-2">
                                {book.author.name}
                            </span>
                        </div>
                        {showButton && (
                            <span id={id} className="btn btn-success my-5" onClick={editBook}>
                                {t('Save')}
                            </span>
                        )}
                    </form>
                </div>
                <span id={id} className="btn btn-danger mt-5" onClick={deleteBook}>
                    {t('Delete')}
                </span>
            </div>
        </div>
    );
}

export default Book;