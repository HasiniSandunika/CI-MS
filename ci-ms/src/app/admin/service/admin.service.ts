import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/http.service';
import { SendMailsDTO } from '../dto/SendMailsDTO.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService) { }

  sendMails(sendMailsDTO: SendMailsDTO): Observable<boolean>{
    return this.httpService.sendMails(sendMailsDTO);
  }

}
