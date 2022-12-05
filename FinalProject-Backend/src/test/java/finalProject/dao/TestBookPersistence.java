package finalProject.dao;

import finalProject.model.Book;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.Date;


import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class TestBookPersistence {

    String author = "Robert";
    String isbn = "1234566777";
    String name = "Cristiano is the GOAT";
    LocalDate datePublished = LocalDate.of(2020, 1, 8);

    @Autowired
    BookRepository bookRepository;

    @Autowired
    UserRepository userRepository;

    @AfterEach
    public void clearDatabase() {
        userRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void testPersistAndLoadBook(){

        Book book = new Book();

        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setDatePublished(datePublished);
        book.setName(name);
        bookRepository.save(book);

        boolean exists = bookRepository.existsBookByIsbn(isbn);
        book = bookRepository.findBookByIsbn(isbn);

        assertTrue(exists);
        assertNotNull(book);

        assertEquals(author, book.getAuthor());
        assertEquals(isbn, book.getIsbn());
        assertEquals(name, book.getName());

    }
}
