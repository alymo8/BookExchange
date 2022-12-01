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

    @Autowired
    BookRepository bookRepository;


    @AfterEach
    public void clearDatabase() {
        bookRepository.deleteAll();
    }

    @Test
    public void testPersistAndLoadBook(){

        Book book = new Book();

        book.setAuthor("Robert Aprahamian");
        book.setIsbn("1234ii");
        book.setDatePublished(new Date());
        book.setName("Messi is the GOAT");
        bookRepository.save(book);

        boolean exists = bookRepository.existsBookByIsbn("1234ii");
        book = bookRepository.findBookByIsbn("1234ii");

        assertTrue(exists);
        assertNotNull(book);

        assertEquals("Robert Aprahamian", book.getAuthor());
        assertEquals("1234ii", book.getIsbn());
        assertEquals("Messi is the GOAT", book.getName());

    }
}
