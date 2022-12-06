package finalProject.controller;

import finalProject.dto.BookDTO;
import finalProject.dto.UserDTO;
import finalProject.model.User;
import finalProject.service.UserService;
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
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        User user;
        try {
            user = userService.createUser(userDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(user), HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        User user;
        try {
            user = userService.login(userDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(user), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/borrow")
    public ResponseEntity<?> borrowBook(@PathVariable("id") UUID id, @RequestBody BookDTO bookDTO) {
        User user;
        try {
            user = userService.borrowBook(id, bookDTO.getId());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(user), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}/offer")
    public ResponseEntity<?> offerBook(@PathVariable("id") UUID id, @RequestBody BookDTO bookDTO) {
        User user;
        try {
            user = userService.offerBook(id, bookDTO.getId());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(user), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}/return")
    public ResponseEntity<?> returnBook(@PathVariable("id") UUID id, @RequestBody BookDTO bookDTO) {
        User user;
        try {
            user = userService.returnBook(id, bookDTO.getId());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(user), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}/unOffer")
    public ResponseEntity<?> unOfferBook(@PathVariable("id") UUID id, @RequestBody BookDTO bookDTO) {
        User user;
        try {
            user = userService.unOfferBook(id, bookDTO.getId());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Conversion.convertToDTO(user), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public UserDTO getUser(@PathVariable("id") UUID id) {
        return Conversion.convertToDTO(userService.getUserById(id));
    }

    @DeleteMapping(value = {"/{id}"})
    public boolean deleteUser(@PathVariable("id") UUID id) {
        return userService.deleteUser(id);
    }

    @GetMapping
    public List<UserDTO> viewUsers(){
        return userService.getAllUsers().stream()
                .map(Conversion::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/{id}/borrowed")
    public List<BookDTO> getUserBorrowedBooks(@PathVariable("id") UUID id) {
        return userService.getUserBorrowedBooks(id).stream()
                .map(Conversion::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/{id}/offered")
    public List<BookDTO> getUserOfferedBooks(@PathVariable("id") UUID id) {
        return userService.getUserOfferedBooks(id).stream()
                .map(Conversion::convertToDTO)
                .collect(Collectors.toList());
    }

}
