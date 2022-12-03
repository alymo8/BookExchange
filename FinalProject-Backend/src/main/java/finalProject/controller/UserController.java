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


}
