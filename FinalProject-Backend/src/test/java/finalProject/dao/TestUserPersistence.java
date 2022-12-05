package finalProject.dao;

import finalProject.model.Book;
import finalProject.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TestUserPersistence {

    String username = "aly";
    String password = "aly123";
    String phoneNumber = "12345";
    String name = "Aly";
    String email = "aly@mail.com";
    String address = "123 Aly Street";

    String author = "Robert";
    String isbn = "1234566777";
    String bookName = "Cristiano is the GOAT";
    LocalDate datePublished = LocalDate.of(2020, 2, 8);


    String author2 = "Robert - 2";
    String isbn2 = "1234566777 - 2";
    String bookName2 = "Cristiano is the GOAT - 2";
    LocalDate datePublished2 = LocalDate.of(2020, 3, 8);


    @Autowired
    UserRepository userRepository;

    @Autowired
    BookRepository bookRepository;

    @AfterEach
    public void clearDatabase() {
        userRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void testPersistAndLoadUser(){

        User user = new User();

        user.setUsername(username);
        user.setPassword(password);
        user.setPhoneNumber(phoneNumber);
        user.setEmail(email);
        user.setAddress(address);
        user.setName(name);

        List<Book> offeredBooks = new ArrayList<>();
        Book book = new Book();
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setDatePublished(datePublished);
        book.setName(bookName);

        offeredBooks.add(book);

        bookRepository.save(book);

        List<Book> borrowedBooks = new ArrayList<>();
        Book book2 = new Book();
        book2.setAuthor(author2);
        book2.setIsbn(isbn2);
        book2.setDatePublished(datePublished2);
        book2.setName(bookName2);

        borrowedBooks.add(book2);

        bookRepository.save(book);
        bookRepository.save(book2);

        user.setOfferedBooks(offeredBooks);
        user.setBorrowedBooks(borrowedBooks);
        userRepository.save(user);

        boolean exists = userRepository.existsUserByUsername(username);
        user = userRepository.findUserByUsername(username).orElse(null);

        assertTrue(exists);
        assertNotNull(user);

        assertEquals(username, user.getUsername());
        assertEquals(password, user.getPassword());
        assertEquals(phoneNumber, user.getPhoneNumber());
        assertEquals(email, user.getEmail());
        assertEquals(address, user.getAddress());
        assertEquals(name, user.getName());

        assertEquals(author, user.getOfferedBooks().get(0).getAuthor());
        assertEquals(bookName,  user.getOfferedBooks().get(0).getName());
        assertEquals(isbn,  user.getOfferedBooks().get(0).getIsbn());
        // no other entries are in user offered books
        try {
            user.getOfferedBooks().get(1);
            assertTrue(false);
        } catch (IndexOutOfBoundsException e) {
            assertTrue(true);
        }

        assertEquals(author2, user.getBorrowedBooks().get(0).getAuthor());
        assertEquals(bookName2,  user.getBorrowedBooks().get(0).getName());
        assertEquals(isbn2,  user.getBorrowedBooks().get(0).getIsbn());
        // no other entries are in user borrowed books
        try {
            user.getBorrowedBooks().get(1);
            assertTrue(false);
        } catch (IndexOutOfBoundsException e) {
            assertTrue(true);
        }

    }
}
