package finalProject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class BookDTO {

    public UUID id;
    public String name;
    public String isbn;
    public String author;
    public Date datePublished;

}
