package com.hasini.cims.models.customer;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "customer")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String customerId;
    private String name;
    private String residence;
    private String tpNo;
    private String email;

}

