package finalProject.service;

import finalProject.dao.BookRepository;
import finalProject.dao.UserRepository;
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
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private UserService userService;

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
    public void testCreateUser() {

        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName(USER_NAME);

        User user = null;
        try {
            user = userService.createUser(userDTO);
        } catch (IllegalArgumentException e) {
            fail();
        }

        assertNotNull(user);
        assertEquals(USER_USERNAME, user.getUsername());
        assertEquals(USER_PASSWORD, user.getPassword());
        assertEquals(USER_PHONE, user.getPhoneNumber());
        assertEquals(USER_ADDRESS, user.getAddress());
        assertEquals(USER_NAME, user.getName());
        assertEquals(USER_EMAIL, user.getEmail());
    }

    @Test
    public void testCreateUserTakenUsername(){
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName(USER_NAME);

        try {
            userService.createUser(userDTO);
        }catch(IllegalArgumentException e) {
            assertEquals("Username is already taken", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankUsername() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("");
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName(USER_NAME);

        try {
            userService.createUser(userDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Username cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankPassword() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword("");
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName(USER_NAME);
        try {
            userService.createUser(userDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Password cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankName() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName("");
        try {
            userService.createUser(userDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Name cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankPhoneNumber() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber("");
        userDTO.setName(USER_NAME);
        try {
            userService.createUser(userDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Phone number cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankEmail() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress(USER_ADDRESS);
        userDTO.setEmail("");
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName(USER_NAME);
        try {
            userService.createUser(userDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Email cannot be blank", e.getMessage());
        }
    }

    @Test
    public void testCreateUserErrorBlankAddress() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(USER_USERNAME);
        userDTO.setPassword(USER_PASSWORD);
        userDTO.setAddress("");
        userDTO.setEmail(USER_EMAIL);
        userDTO.setPhoneNumber(USER_PHONE);
        userDTO.setName(USER_NAME);
        try {
            userService.createUser(userDTO);
        }catch (IllegalArgumentException e) {
            assertEquals("Address cannot be blank", e.getMessage());
        }
    }

    @Test
    public void deleteUserSuccess() {
        boolean success = false;
        try {
            success = userService.deleteUser(USER_ID);
        }catch(IllegalArgumentException e) {
            fail();
        }
        assertTrue(success);
    }


    @Test
    public void deleteUserUserNotFound() {
        UUID id = UUID.randomUUID();
        try {
            userService.deleteUser(id);
        }catch(IllegalArgumentException e) {
            assertEquals("User " + id + " not found.", e.getMessage());
        }
    }

}
