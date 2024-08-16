import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { searchBooks } from "../api/service";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function Result() {
    const [loading, setLoading] = useState(true);
    const { word } = useParams();
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);

        searchBooks(word).then(response => {
            // Assuming your API returns authors and books as separate fields
            setBooks(response.data.books);
            setAuthors(response.data.authors);
            setLoading(false);

        }).catch(error => {
            console.log(error);
            setLoading(false);
        });

    }, [word]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-1 m-auto">{t('Results for')} '{word}'</h2>
            </div>
            {authors.length > 0 ? (
                <div className="container my-4">
                    <h3 className="text-center">{t('Authors')}</h3>
                    <table className="table table-sm table-bordered text-center align-middle">
                        <thead className="h6 table-primary">
                            <tr>
                                <th>{t('Authors')}</th>
                                <th>{t('Books')}</th>
                            </tr>
                        </thead>
                        <tbody className="h6 table-warning">
                            {authors.map(author => (
                                <tr key={author.id}>
                                    <td>
                                        <a href={`/author/${author.id}`} className='text-decoration-none'>{author.name}</a>
                                    </td>
                                    <td>{author.books}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="d-flex justify-content-center my-2">
                    <h4 className="text-center fw-bold mx-1 m-auto">{t('No authors found')}</h4>
                </div>
            )}
            {books.length > 0 ? (
                <div className="container my-4">
                    <h3 className="text-center">{t('Books')}</h3>
                    <table className="table table-sm table-bordered text-center align-middle">
                        <thead className="h6 table-primary">
                            <tr>
                                <th>{t('Title')}</th>
                                <th>{t('Author')}</th>
                            </tr>
                        </thead>
                        <tbody className="h6 table-warning">
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>
                                        <a href={`/book/${book.id}`} className='text-decoration-none'>{book.title}</a>
                                    </td>
                                    <td>
                                        <a href={`/author/${book.author.id}`} className='text-decoration-none'>{book.author.name}</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="d-flex justify-content-center my-2">
                    <h4 className="text-center fw-bold mx-1 m-auto">{t('No books found')}</h4>
                </div>
            )}
        </div>
    );
}

export default Result;