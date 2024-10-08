import axios from "axios";

const host = 'https://destiny-library-server.onrender.com'
// const host = 'https://my-books-server.onrender.com'
// const host = 'http://localhost:8080'

export function getAllBooks() {
    return axios.get(`${host}/books`)
}

export function getBookById(bookId) {
    return axios.get(`${host}/book/${bookId}`)
}

export function addBook(title, authorId) {
    return axios.post(`${host}/add-book?title=${title}&authorId=${authorId}`)
}

export async function editBookById(book) {
    options.method = 'POST';
    options.body = JSON.stringify(book);

    return await fetch(`${host}/edit-book`, options).then(response => response.ok)
}

export function deleteBookById(bookId) {
    return axios.post(`${host}/delete-book/${bookId}`)
}

export function getAllAuthors() {
    return axios.get(`${host}/authors`)
}

export function getAuthorById(authorId) {
    return axios.get(`${host}/author/${authorId}`)
}

export async function addAuthor(name) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: name,
    };

    console.log(options.body);


    const response = await fetch(`${host}/add-author`, options);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}


export function editAuthorById(id, name) {
    return axios.post(`${host}/edit-author?id=${id}&name=${name}`)
}

export function deleteAuthorById(id) {
    return axios.post(`${host}/delete-author/${id}`)
}

const options = {
    method: '',
    headers: {
        'Content-Type': 'application/json',
    },
}

export function searchBooks(title) {
    return axios.post(`${host}/search?word=${title}`)
}

