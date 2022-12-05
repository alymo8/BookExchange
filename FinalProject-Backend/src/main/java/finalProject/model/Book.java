package finalProject.model;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;
import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
public class Book {

    UUID id;
    String name;
    String isbn;
    String author;
    LocalDate datePublished;

    // empty constructor used to create a book
    public Book(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(LocalDate datePublished) {
        this.datePublished = datePublished;
    }

}
