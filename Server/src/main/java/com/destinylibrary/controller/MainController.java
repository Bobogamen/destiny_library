package com.destinylibrary.controller;

import com.destinylibrary.model.dto.AuthorDTO;
import com.destinylibrary.model.entity.Book;
import com.destinylibrary.service.AuthorService;
import com.destinylibrary.service.BookService;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://destiny-library.netlify.app")

public class MainController {

    private final BookService bookService;
    private final AuthorService authorService;

    public MainController(BookService bookService, AuthorService authorService) {
        this.bookService = bookService;
        this.authorService = authorService;
    }

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        System.out.println("Response sent at: " +
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss")));
        return this.bookService.getAllBooks();
    }

    @GetMapping("/book/{id}")
    public Book getBookById(@PathVariable long id) {
        return this.bookService.getBookById(id);
    }

    @PostMapping("/add-book")
    public boolean addBook(@RequestParam String title, @RequestParam long authorId) {
        if (title.isBlank() || title.length() < 3 || authorId < 1) {
            return false;
        }
        return this.bookService.addBook(title, authorId);
    }

    @PostMapping("/edit-book")
    public boolean editBook(@RequestBody String book) throws JsonProcessingException {
        return this.bookService.editBook(book);
    }

    @PostMapping("/delete-book/{id}")
    public boolean deleteBook(@PathVariable long id) {
        return this.bookService.deleteBook(id);
    }

    @GetMapping("/authors")
    public List<AuthorDTO> getAllAuthors() {
        return this.authorService.getAllAuthors();
    }

    @GetMapping("/author/{id}")
    public AuthorDTO getAuthor(@PathVariable long id) {
        return this.authorService.getAuthor(id);
    }

    @PostMapping("/add-author")
    public boolean addAuthor(@RequestBody String name) {
        if (name.isBlank() || name.length() < 3) {
            return false;
        }

        return this.authorService.addAuthor(name);
    }

    @PostMapping("/edit-author")
    public String editAuthor(@RequestParam long id, @RequestParam String name) {
        return this.authorService.editAuthorName(id, name);
    }

    @PostMapping("/delete-author/{id}")
    public boolean deleteAuthorAndHisBooks(@PathVariable long id) {
        return this.authorService.deleteAuthorByIdAndHisBooks(id);
    }

    @PostMapping("/search")
    public List<Book> search(@RequestParam String word) {
        return this.bookService.searchBook(word);
    }

}
