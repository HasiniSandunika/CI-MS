package com.hasini.cims.emailservice.repository;
import com.hasini.cims.models.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Customer, Integer> {
}
