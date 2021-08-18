package com.hasini.cims.recordservice.controller;
import com.hasini.cims.models.record.Record;
import com.hasini.cims.recordservice.dto.GetAllContactsDTO;
import com.hasini.cims.recordservice.dto.UpdateRecordDTO;
import com.hasini.cims.recordservice.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;


@RestController
@RequestMapping(value = "/services/record")
public class RecordController {

    @Autowired
    private RecordService recordService;

    @RequestMapping(value = "findContact/{customerId}", method = RequestMethod.GET)
    @ResponseBody
    public int findContactByCustomerId(@PathVariable String customerId) throws ParseException {
        return recordService.findContactByCustomerId(customerId);
    }

    @CrossOrigin
    @PostMapping
    public Record saveRecord(@RequestBody Record record) throws ParseException {
        return recordService.saveRecord(record);
    }

    @CrossOrigin
    @PutMapping
    public Record updateRecord(@RequestBody UpdateRecordDTO updateRecordDTO){
        return recordService.updateRecord(updateRecordDTO);
    }

    @CrossOrigin
    @RequestMapping(value = "/informAll", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendMailsToAllContacts(@RequestBody GetAllContactsDTO getAllContactsDTO){
        return recordService.sendMailsToAllContacts(getAllContactsDTO);
    }

}
