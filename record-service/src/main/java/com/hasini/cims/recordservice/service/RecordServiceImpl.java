package com.hasini.cims.recordservice.service;
import com.hasini.cims.models.record.Record;
import com.hasini.cims.recordservice.dto.GetAllContactsDTO;
import com.hasini.cims.recordservice.dto.UpdateRecordDTO;
import com.hasini.cims.recordservice.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class RecordServiceImpl implements RecordService{

    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public boolean getIsMonth(String lastDate) throws ParseException {
        boolean isMonth = false;
        Date firstDate = new SimpleDateFormat("dd/MM/yyyy").parse(lastDate);
        Date today = new SimpleDateFormat("dd/MM/yyyy").parse(DateTimeFormatter.
                ofPattern("dd/MM/yyyy").format(LocalDateTime.now()));
        long diffInMilli = Math.abs(today.getTime() - firstDate.getTime());
        long difference = TimeUnit.DAYS.convert(diffInMilli, TimeUnit.MILLISECONDS);
        if(difference >= 30){
            isMonth = true;
        }
        return isMonth;
    }

    @Override
    public int findContactByCustomerId(String customerId) throws ParseException {
        List<Record> records = recordRepository.findAll();
        int isContacted = 0;
        Collections.reverse(records);
        for (Record record : records) {
            String recordCustomerId = record.getCustomerId();
            int recordIsContact = record.getIsContact();
            if ((Objects.equals(recordCustomerId, customerId)) && (recordIsContact == 1)) {
                if(!getIsMonth(record.getDate())){
                    isContacted = 1;
                }
                else{
                    //isContacted = 0;
                    record.setIsContact(isContacted);
                    recordRepository.save(record);
                }
                break;
            }
        }
        return isContacted;
    }

    @Override
    public Record saveRecord(Record record) throws ParseException {
        if(findContactByCustomerId(record.getCustomerId()) == 0){
            return recordRepository.save(record);
        }
        else{
            return null;
        }
    }

    @Override
    public Record updateRecord(UpdateRecordDTO updateRecordDTO) {
        List<Record> records = recordRepository.findAll();
        Record updatedRecord = null;
        for (Record record : records) {
            String recordCustomerId = record.getCustomerId();
            String dtoCustomerId = updateRecordDTO.getCustomerId();
            float recordLeave = record.getLeave();
            if ((Objects.equals(recordCustomerId, dtoCustomerId)) && (recordLeave==0)) {
                record.setLeave(updateRecordDTO.getLeave());
                updatedRecord = record;
                recordRepository.save(updatedRecord);
                break;
            }
        }
        return updatedRecord;
    }

    @Override
    public List<String> getAllFirstContacts(GetAllContactsDTO getAllContactsDTO) {
        List<Record> records = recordRepository.findAll();
        List<String> customerIds = null;
        for (Record record : records) {
            if (Objects.equals(record.getDate(), getAllContactsDTO.getDate()) &&
                    checkContact(record.getArrival(), record.getLeave(),
                            getAllContactsDTO.getFrom(), getAllContactsDTO.getTo())) {
                customerIds.add(record.getCustomerId());
            }
        }
        return customerIds;
    }

    @Override
    public boolean checkContact(float from, float to, float fromF, float toF){
        boolean contact = false;
        if(from <= fromF && to >= toF)
            contact = true;
        else if(from >= fromF && to <= toF)
            contact = true;
        else if(from <= fromF && to > fromF && to <= toF)
            contact = true;
        else if(from >= fromF && from < toF && to >= toF)
            contact = true;
        else
            contact = false;
        return contact;
    }

    @Override
    public boolean sendMailsToAllContacts(GetAllContactsDTO getAllContactsDTO){
        List<String> customerIds = getAllFirstContacts(getAllContactsDTO);
        boolean isSent = false;
        for (String customerId : customerIds) {
            GetAllContactsDTO getAllContactsDTO1 = restTemplate.postForObject("http://email/services/email/"
                    +customerId, getAllContactsDTO, GetAllContactsDTO.class);
            if(getAllContactsDTO1 != null){
                isSent = true;
            }
            else{
                isSent = false;
                break;
            }
        }
        return isSent;
    }

    @LoadBalanced
    @Bean
    RestTemplate getRestTemplate(RestTemplateBuilder restTemplateBuilder){
        return restTemplateBuilder.build();
    }
}
