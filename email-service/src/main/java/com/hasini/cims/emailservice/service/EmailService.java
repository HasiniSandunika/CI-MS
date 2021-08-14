package com.hasini.cims.emailservice.service;
import com.hasini.cims.emailservice.dto.GetAllContactsDTO;
import java.text.ParseException;

public interface EmailService {

    String getEmilAddress(String customerId);
    GetAllContactsDTO sendMail(String customerId, GetAllContactsDTO getAllContactsDTO) throws ParseException;

}

