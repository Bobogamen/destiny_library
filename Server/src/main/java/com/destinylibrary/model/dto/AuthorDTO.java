package com.destinylibrary.model.dto;

import java.util.ArrayList;
import java.util.List;

import com.destinylibrary.model.entity.Book;

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
