import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/http.service';
import { SaveRecordDTO } from '../dto/SaveRecord.dto';
import { CustomerRecord } from '../../model/CustomerRecord.model';

@Injectable({
  providedIn: 'root'
})
export class ArrivalService {

  constructor(private httpService: HttpService) { }

  saveRecord(saveRecordDTO: SaveRecordDTO): Observable<CustomerRecord>{
    return this.httpService.saveRecord(saveRecordDTO);
  }

}
