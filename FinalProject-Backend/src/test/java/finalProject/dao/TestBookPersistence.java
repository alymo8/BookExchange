package finalProject.dao;

import finalProject.model.Book;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Date;


import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TestBookPersistence {

    String author = "Robert";
    String isbn = "1234566777";
    String name = "Messi is the GOAT";

    @Autowired
    BookRepository bookRepository;


    @AfterEach
    public void clearDatabase() {
        bookRepository.deleteAll();
    }

    @Test
    public void testPersistAndLoadBook(){

        Book book = new Book();

        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setDatePublished(new Date());
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
