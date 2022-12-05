package finalProject.service;

import finalProject.dao.BookRepository;
import finalProject.dao.UserRepository;
import finalProject.dto.BookDTO;
import finalProject.dto.UserDTO;
import finalProject.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
public class BookServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private static final UUID USER_ID = UUID.randomUUID();
    private static final String USER_USERNAME = "TestUsername";
    private static final String USER_NAME = "TestUser";
    private static final String USER_PASSWORD = "TestPassword123";
    private static final String USER_ADDRESS ="5th, park Avenue";
    private static final String USER_EMAIL = "TestUser@mail.com";
    private static final String USER_PHONE = "5141234567";

    private static final UUID BOOK_ID = UUID.randomUUID();
    private static final String BOOK_NAME = "TestBook";
    private static final String BOOK_ISBN = "124BGHR321";
    private static final String BOOK_AUTHOR = "Zola";
    private static final LocalDate BOOK_DATE_PUBLISHED = LocalDate.parse("2020-01-01");

    @BeforeEach
    public void setMockOutput() {

        lenient().when(userRepository.findById(any(UUID.class))).thenAnswer((InvocationOnMock invocation) -> {
            if(invocation.getArgument(0).equals(USER_ID)) {
                return userRepository.findUserByUsername(USER_USERNAME);
            }else {
                return Optional.empty();
            }
        });

        Answer<?> returnParameterAsAnswer = (InvocationOnMock invocation) -> invocation.getArgument(0);

        lenient().when(userRepository.save(any(User.class))).thenAnswer(returnParameterAsAnswer);
        lenient().when(bookRepository.save(any(Book.class))).thenAnswer(returnParameterAsAnswer);
        lenient().doNothing().when(userRepository).delete(any(User.class));
    }

    @Test
    public void testCreateBook() {

        BookDTO bookDTO = new BookDTO();
        bookDTO.setIsbn(BOOK_ISBN);
        bookDTO.setAuthor(BOOK_AUTHOR);
        bookDTO.setName(BOOK_NAME);
        bookDTO.setDatePublished(BOOK_DATE_PUBLISHED);

        Book book = null;

        try {
            book = bookService.createBook(bookDTO);
        } catch (IllegalArgumentException e) {
            fail();
        }

        assertNotNull(book);
        assertEquals(BOOK_ISBN, book.getIsbn());
        assertEquals(BOOK_AUTHOR, book.getAuthor());
        assertEquals(BOOK_NAME, book.getName());
        assertEquals(BOOK_DATE_PUBLISHED, book.getDatePublished());
    }


    @Test
    public void testCreateUserErrorBlankName() {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setIsbn(BOOK_ISBN);
        bookDTO.setAuthor(BOOK_AUTHOR);
        bookDTO.setName("");
        bookDTO.setDatePublished(BOOK_DATE_PUBLISHED);

        try {
            bookService.createBook(bookDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Name cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankAuthor() {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setIsbn(BOOK_ISBN);
        bookDTO.setAuthor("");
        bookDTO.setName(BOOK_NAME);
        bookDTO.setDatePublished(BOOK_DATE_PUBLISHED);

        try {
            bookService.createBook(bookDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Author cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankIsbn() {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setIsbn("");
        bookDTO.setAuthor(BOOK_AUTHOR);
        bookDTO.setName(BOOK_NAME);
        bookDTO.setDatePublished(BOOK_DATE_PUBLISHED);

        try {
            bookService.createBook(bookDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Isbn cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankDatePublished() {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setIsbn(BOOK_ISBN);
        bookDTO.setAuthor(BOOK_AUTHOR);
        bookDTO.setName(BOOK_NAME);
        bookDTO.setDatePublished(null);

        try {
            bookService.createBook(bookDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Date cannot be blank", e.getMessage());
        }
    }

    @Test
    public void deleteBookSuccess() {
        boolean success = false;
        try {
            success = bookService.deleteBook(BOOK_ID);
        }catch(IllegalArgumentException e) {
            fail();
        }
        assertTrue(success);
    }


    @Test
    public void deleteBookUserNotFound() {
        UUID id = UUID.randomUUID();
        try {
            bookService.deleteBook(id);
        }catch(IllegalArgumentException e) {
            assertEquals("Book " + id + " not found.", e.getMessage());
        }
    }

}
