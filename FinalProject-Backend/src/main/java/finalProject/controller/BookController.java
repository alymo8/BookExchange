package finalProject.controller;


import finalProject.dto.BookDTO;
import finalProject.dto.UserDTO;
import finalProject.model.Book;
import finalProject.model.User;
import finalProject.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody BookDTO bookDTO) {
        Book book;
        try {
            book = bookService.createBook(bookDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(book), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public BookDTO getBook(@PathVariable("id") UUID id) {
        return Conversion.convertToDTO(bookService.getBookById(id));
    }

    @DeleteMapping(value = {"/{id}"})
    public boolean deleteBook(@PathVariable("id") UUID id, UserDTO userDTO) {
        return bookService.deleteBook(id, userDTO.getId());
    }

    @GetMapping
    public List<BookDTO> viewBooks(){
        return bookService.getAllBooks().stream()
                .map(Conversion::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/available")
    public List<BookDTO> viewAvailableBooks(){
        return bookService.getAllAvailableBooks().stream()
                .map(Conversion::convertToDTO)
                .collect(Collectors.toList());
    }
}
