package com.mybooks.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mybooks.model.entity.Author;
import com.mybooks.model.entity.Book;
import com.mybooks.repository.AuthorRepository;
import com.mybooks.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }
    public List<Book> getAllBooks() {
        return this.bookRepository.findAll().stream()
                .sorted(Comparator.comparing(a -> a.getAuthor().getName())).
                toList();
    }

    public Book getBookById(long id) {
        return this.bookRepository.getBookById(id);
    }

    public boolean addBook(String title, long authorId) {
        Book newBook = new Book();
        newBook.setTitle(title);

        Author author = this.authorRepository.getAuthorById(authorId);

        if (author == null) {
            return  false;
        }

        newBook.setAuthor(author);

        this.bookRepository.save(newBook);

        return true;
    }

    public boolean editBook(String book) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(book);

        try {
            int bookId = jsonNode.get("id").asInt();
            String title = jsonNode.get("title").asText();
            int authorId = jsonNode.get("author").get("id").asInt();

            Book bookForEdit = this.bookRepository.getBookById(bookId);
            bookForEdit.setTitle(title);
            bookForEdit.setAuthor(this.authorRepository.getAuthorById(authorId));
            this.bookRepository.save(bookForEdit);

        } catch (Exception exception) {
            return false;
        }

        return true;
    }

    public boolean deleteBook(long bookId) {
        this.bookRepository.deleteById(bookId);

        return true;
    }

    public List<Book> searchBook(String word) {
        return this.bookRepository.findBooksByTitle(word);
    }
}
