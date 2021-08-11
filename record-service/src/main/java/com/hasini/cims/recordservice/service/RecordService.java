package com.hasini.cims.recordservice.service;
import com.hasini.cims.models.record.Record;
import com.hasini.cims.recordservice.dto.GetAllContactsDTO;
import com.hasini.cims.recordservice.dto.UpdateRecordDTO;
import java.text.ParseException;
import java.util.List;

public interface RecordService {

    int findContactByCustomerId(String customerId) throws ParseException;
    boolean getIsMonth(String lastDate) throws ParseException;
    Record saveRecord(Record record) throws ParseException;
    Record updateRecord(UpdateRecordDTO updateRecordDTO);
    boolean sendMailsToAllContacts(GetAllContactsDTO getAllContactsDTO);
    List<String> getAllFirstContacts(GetAllContactsDTO getAllContactsDTO);
    boolean checkContact(float from, float to, float fromF, float toF);

}
