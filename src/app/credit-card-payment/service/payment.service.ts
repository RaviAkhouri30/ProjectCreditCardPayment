import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ApiConstant } from '../constants/api.constant';
import { CreditCardDto } from '../model/credit-card-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public save(param: CreditCardDto): Observable<object> {
    console.log(JSON.stringify(param), 'ppa');
    return this.httpClient.post(environment.baseUrl + ApiConstant.SAVE + '/', param);
  }

  public get(): Observable<object> {
    return this.httpClient.get(environment.baseUrl + ApiConstant.SAVE);
  }

}
