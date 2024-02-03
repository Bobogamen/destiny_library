package com.destinylibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.destinylibrary.model.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author getAuthorById(long id);
}
