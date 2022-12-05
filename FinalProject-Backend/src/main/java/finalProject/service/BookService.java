package finalProject.service;

import finalProject.dao.BookRepository;
import finalProject.dao.UserRepository;
import finalProject.dto.*;
import finalProject.model.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class BookService {

    private final BookRepository bookRepository;

    public Book createBook(BookDTO bookDTO) {
        Book book = new Book();
        String isbn = bookDTO.getIsbn();
        String author = bookDTO.getAuthor();
        LocalDate datePublished = bookDTO.getDatePublished();
        String name = bookDTO.getName();

        if(name == null || name.equals("")) throw new IllegalArgumentException("Name cannot be blank");
        if(isbn == null || isbn.equals("")) throw new IllegalArgumentException("Isbn cannot be blank");
        if(author == null || author.equals("")) throw new IllegalArgumentException("Author cannot be blank");
        if(datePublished == null) throw new IllegalArgumentException("Date cannot be blank");

        book.setAuthor(author);
        book.setName(name);
        book.setDatePublished(datePublished);
        book.setIsbn(isbn);

        return bookRepository.save(book);
    }

    public Book getBookById(UUID id) {
        return bookRepository.findById(id).orElse(null);
    }

    public boolean deleteBook(UUID id) {
        try {
            bookRepository.deleteById(id);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }


}
