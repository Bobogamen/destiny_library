package com.mybooks.repository;

import com.mybooks.model.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> getBooksByAuthorId(long authorId);
    Book getBookById(long bookId);

    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER('%' || :word || '%')")
    List<Book> findBooksByTitle(String word);
}
