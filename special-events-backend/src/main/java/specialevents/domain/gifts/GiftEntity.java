package specialevents.domain.gifts;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "gifts")
public class GiftEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private boolean done;

    public GiftEntity(){};
    public GiftEntity(long id, String name, boolean done) {
        this.id = id;
        this.name = name;
        this.done = done;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
