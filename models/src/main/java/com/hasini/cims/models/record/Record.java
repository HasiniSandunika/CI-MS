package com.hasini.cims.models.record;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "record")
@Data
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String customerId;
    private String date;
    private float arrival;
    private float leave;
    private int isContact;

}
