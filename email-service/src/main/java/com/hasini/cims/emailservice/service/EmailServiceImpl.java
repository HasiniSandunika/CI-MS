package com.hasini.cims.emailservice.service;
import com.hasini.cims.emailservice.dto.GetAllContactsDTO;
import com.hasini.cims.emailservice.repository.EmailRepository;
import com.hasini.cims.models.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private EmailRepository emailRepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private SimpleMailMessage simpleMailMessage;

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

    public GetAllContactsDTO sendMail(String customerId, GetAllContactsDTO getAllContactsDTO)
            throws ParseException {
        String email = getEmilAddress(customerId);
        Date date = new SimpleDateFormat("dd/MM/yyyy").parse(getAllContactsDTO.getDate());
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, 30);
        String toDate = new SimpleDateFormat("dd/MM/yyyy").format(cal.getTime());
        String body = "Dear Customer, \n" +
                "\n" +
                "It has been noted that you are been identified as first contact of the covid disease "+
                "at FC supermarket since "+ getAllContactsDTO.getDate()+". You will be ineligible to enter "+
                "into any of our branches until "+toDate+". Please, make sure to be self quarantined and do "+
                "the necessary covid tests to stay safe and healthy.\n" +
                "\n" +
                "Sincerely,\n" +
                "FC supermarket";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setFrom("@@@@@@@");
        message.setSubject("Inform the Covid Status");
        message.setText(body);
        javaMailSender.send(message);
        return getAllContactsDTO;
    }

}
