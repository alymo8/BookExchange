package finalProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import finalProject.model.Book;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    boolean existsBookByIsbn(String isbn);
    Book findBookByIsbn(String isbn);
    List<Book> findAllByBookAvailability(String bookAvailability);

}