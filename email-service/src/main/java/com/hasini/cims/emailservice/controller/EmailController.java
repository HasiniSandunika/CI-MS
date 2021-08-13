package com.hasini.cims.emailservice.controller;
import com.hasini.cims.emailservice.dto.GetAllContactsDTO;
import com.hasini.cims.emailservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/services/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/{customerId}", method = RequestMethod.POST)
    @ResponseBody
    public GetAllContactsDTO sendMail(@PathVariable String customerId,
                                  @RequestBody GetAllContactsDTO getAllContactsDTO){
        return emailService.sendMail(customerId, getAllContactsDTO);
    }
}
