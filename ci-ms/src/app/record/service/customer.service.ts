import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/http.service';
import { SaveRecordDTO } from '../dto/SaveRecord.dto';
import { UpdateRecordDTO } from '../dto/UpdateRecord.dto';
import { CustomerRecord } from '../model/Record.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) { }

  saveRecord(saveRecordDTO: SaveRecordDTO): Observable<CustomerRecord>{
    return this.httpService.saveRecord(saveRecordDTO);
  }

  updateRecord(updateRecordDTO: UpdateRecordDTO): Observable<CustomerRecord>{
    return this.httpService.updateRecord(updateRecordDTO);
  }

}
