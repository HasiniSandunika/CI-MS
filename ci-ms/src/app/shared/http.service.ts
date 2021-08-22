import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SendMailsDTO } from "../admin/dto/SendMailsDTO.dto";
import { SaveRecordDTO } from "../customer/record/dto/SaveRecord.dto";
import { CustomerRecord } from "../customer/model/CustomerRecord.model";
import { UpdateRecordDTO } from "../customer/update/dto/UpdateRecord.dto";

@Injectable({providedIn: 'root'})
export class HttpService{

    private baseUrl: string = 'http://localhost:9191/services/record';

    constructor(private httpClient: HttpClient){}

    sendMails(sendMailsDTO: SendMailsDTO): Observable<boolean>{
        return this.httpClient.post<boolean>(this.baseUrl+'/informAll', sendMailsDTO);
    }

    saveRecord(saveRecordDTO: SaveRecordDTO): Observable<CustomerRecord>{
        return this.httpClient.post<CustomerRecord>(this.baseUrl, saveRecordDTO);
    }

    updateRecord(updateRecordDTO: UpdateRecordDTO): Observable<CustomerRecord>{
        return this.httpClient.put<CustomerRecord>(this.baseUrl, updateRecordDTO);
    }
    
}