package com.mybooks.model.dto;

import com.mybooks.model.entity.Book;

import java.util.ArrayList;
import java.util.List;

public class AuthorDTO {

    private long id;
    private String name;
    private List<Book> books;
    public AuthorDTO() {
        this.books = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}
