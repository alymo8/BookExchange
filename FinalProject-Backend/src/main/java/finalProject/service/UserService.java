package finalProject.service;

import finalProject.dao.BookRepository;
import finalProject.dao.UserRepository;
import finalProject.dto.UserDTO;
import finalProject.model.Book;
import finalProject.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public User createUser(UserDTO userDTO) {
        User user = new User();
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        String address = userDTO.getAddress();
        String name = userDTO.getName();
        String email = userDTO.getEmail();
        String phoneNumber = userDTO.getPhoneNumber();

        if(username == null || username.equals("")) throw new IllegalArgumentException("Username cannot be blank");
        if(password == null || password.equals("")) throw new IllegalArgumentException("Password cannot be blank");
        if(name == null || name.equals("")) throw new IllegalArgumentException("Name cannot be blank");
        if(address == null || address.equals("")) throw new IllegalArgumentException("Address cannot be blank");
        if(email == null || email.equals("")) throw new IllegalArgumentException("Email cannot be blank");
        if(phoneNumber == null || phoneNumber.equals("")) throw new IllegalArgumentException("Phone number cannot be blank");

        if(userRepository.findUserByUsername(username).isPresent()) throw new IllegalArgumentException("Username is already taken");

        user.setUsername(username);
        user.setPassword(password);
        user.setAddress(address);
        user.setName(name);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);

        List<Book> borrowedBooks = bookRepository.findAllById(userDTO.getBorrowedBooksIds());
        List<Book> offeredBooks = bookRepository.findAllById(userDTO.getOfferedBooksIds());

        user.setBorrowedBooks(borrowedBooks);
        user.setOfferedBooks(offeredBooks);

        return userRepository.save(user);
    }

    public User offerBook(UUID userId, UUID bookId){
        User user = getUserById(userId);
        if (user == null) throw new IllegalArgumentException("User does not exist");

        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) throw new IllegalArgumentException("Book does not exist");

        List<Book> offeredBooks = user.getOfferedBooks();
        offeredBooks.add(book);
        user.setOfferedBooks(offeredBooks);

        return userRepository.save(user);
    }

    public User borrowBook(UUID userId, UUID bookId){
        User user = getUserById(userId);
        if (user == null) throw new IllegalArgumentException("User does not exist");

        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) throw new IllegalArgumentException("Book does not exist");

        List<Book> borrowedBooks = user.getBorrowedBooks();
        borrowedBooks.add(book);
        user.setBorrowedBooks(borrowedBooks);

        return userRepository.save(user);

    }

    public User getUserById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    public boolean deleteUser(UUID id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
