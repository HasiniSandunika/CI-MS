package com.hasini.cims.emailservice.service;

import com.hasini.cims.emailservice.dto.GetAllContactsDTO;

public interface EmailService {

String getEmilAddress(String customerId);
GetAllContactsDTO sendMail(String customerId, GetAllContactsDTO getAllContactsDTO);
}

