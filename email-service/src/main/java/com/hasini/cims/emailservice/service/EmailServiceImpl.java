package com.hasini.cims.emailservice.service;
import com.hasini.cims.emailservice.dto.GetAllContactsDTO;
import com.hasini.cims.emailservice.repository.EmailRepository;
import com.hasini.cims.models.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private EmailRepository emailRepository;

    public String getEmilAddress(String customerId){
        List<Customer> customers = emailRepository.findAll();
        String customerEmail = null;
        for(Customer customer1: customers){
            if(Objects.equals(customer1.getCustomerId(), customerId)){
                customerEmail = customer1.getEmail();
                break;
            }
        }
        return customerEmail;
    }

    public GetAllContactsDTO sendMail(String customerId, GetAllContactsDTO getAllContactsDTO){
        String email = getEmilAddress(customerId);
        //impl
        return getAllContactsDTO;
    }
}
