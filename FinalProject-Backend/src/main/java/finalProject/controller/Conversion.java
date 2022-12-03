package finalProject.controller;

import finalProject.dto.BookDTO;
import finalProject.dto.UserDTO;
import finalProject.model.Book;
import finalProject.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Conversion {

    public static UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setAddress(user.getAddress());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setPhoneNumber(user.getPhoneNumber());

        List<UUID> borrowedBooks = new ArrayList<>();
        for(Book b: user.getBorrowedBooks()) {
            borrowedBooks.add(b.getId());
        }
        userDTO.setBorrowedBooksIds(borrowedBooks);

        List<UUID> offeredBooks = new ArrayList<>();
        for(Book b: user.getOfferedBooks()) {
            offeredBooks.add(b.getId());
        }
        userDTO.setOfferedBooksIds(offeredBooks);
        return userDTO;
    }

    public static BookDTO convertToDTO(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getId());
        bookDTO.setAuthor(book.getAuthor());
        bookDTO.setDatePublished(book.getDatePublished());
        bookDTO.setName(book.getName());
        bookDTO.setIsbn(book.getIsbn());
        return bookDTO;
    }

}
