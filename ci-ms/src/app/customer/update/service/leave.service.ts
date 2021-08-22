import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/http.service';
import { UpdateRecordDTO } from '../dto/UpdateRecord.dto';
import { CustomerRecord } from '../../model/CustomerRecord.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private httpService: HttpService) { }
  
  updateRecord(updateRecordDTO: UpdateRecordDTO): Observable<CustomerRecord>{
    return this.httpService.updateRecord(updateRecordDTO);
  }

}