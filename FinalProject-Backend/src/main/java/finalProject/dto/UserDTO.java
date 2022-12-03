package finalProject.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    public UUID id;
    public String username;
    public String password;
    public String name;
    public String email;
    public String address;
    public String phoneNumber;
    public List<UUID> offeredBooksIds;
    public List<UUID> borrowedBooksIds;

}
