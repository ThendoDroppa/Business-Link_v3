import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { Company } from '../models/company';
import { SharedService } from './../services/shared.service';

import { User } from '../models/user';

@Injectable()
export class LoginService {

  constructor(private http: Http, private httpClient: HttpClient, private sharedService: SharedService) { }

  // register(user: User): Observable<any> {
  //   const deviceId = new Date().valueOf();
  //   var pass = user.login.pwd.split('');
  //   const userData = {
  //     'owner': {
  //       'deviceId': deviceId,
  //       'mobile': user.mobile,
  //       'firstName': user.firstName,
  //       'surname': user.surname,
  //       'rsaId': user.mobile,
  //       'email': user.email
  //     },
  //     'username': user.email,
  //     'pwd': pass
  //   };

  //   return this.httpClient.post(this.sharedService.getUrl() + 'sessions/register', userData,
  //     { headers: new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json') });

  //     const options = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       })
  //     };
  //   return this.httpClient.post(this.sharedService.getUrl() + 'sessions/register', userData, options);
  // }

  registerUser(user: User): Observable<any> {
    const deviceId = new Date().valueOf();
    const pass = user.login.pwd.split('');
    const userData = {
      'owner': {
        'deviceId': deviceId,
        'mobile': user.mobile,
        'firstName': user.firstName,
        'surname': user.surname,
        'rsaId': user.mobile,
        'email': user.email
      },
      'username': user.email,
      'pwd': pass
    };
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'sessions/register', userData, options);
  }

  confirmOTP(otp: number, phoneNo: string): Observable<any> {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'sessions/mobile/confirmations/' + phoneNo + '/' + otp, '', options);
  }

  companyInfo(company: any, token: string): Observable<any> {

    var object = JSON.parse(localStorage.getItem('userData'));

    var companyData = {
      'registrationNumber': company.companyReg,
      'name': company.companyName,
      'contact': {
        'oid': object.owner.oid,
        'deviceId': object.owner.deviceId,
        'mobile': object.owner.mobile,
        'firstName': object.owner.firstName,
        'surname': object.owner.surname,
        'rsaId': object.owner.rsaId,
        'email': object.owner.email
      },
      'owner': {
        'oid': object.owner.oid,
        'deviceId': object.owner.deviceId,
        'mobile': object.owner.mobile,
        'firstName': object.owner.firstName,
        'surname': object.owner.surname,
        'rsaId': object.owner.rsaId,
        'email': object.owner.email
      }
    };

    var vehicleData = {
      'registrationNumber': company.registration,
      'vinNumber': company.vinNo,
      'make': company.make,
      'model': company.model,
      'color': company.Vcolor,
      'type': company.type,
      'companyId': object.owner.deviceId
      // "driverId": "string"
    };

    // company/info
    var data = {
      'vehicle': vehicleData,
      'company': companyData
    };

    console.log(data);
    var userToken = 'Bearer ' + token;
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'parties/company/info', data, options);
  }

  login(password, email): Observable<any> {
    var pass = password.split('');
    var login = {
      'username': email,
      'pwd': password
    };
    return this.httpClient.post(this.sharedService.getUrl() + 'sessions/login', login,
      { headers: new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json') });
  }

  uploadDocs(idObject, cpicObject, diskObject, token): Observable<any> {

    var data = [];
    var documents = {};
    if (cpicObject.document === undefined) {
      data = [
        idObject,
        diskObject
      ];
      documents = {
        'documents': data
      };
    } else {
      data = [
        idObject,
        diskObject,
        cpicObject
      ];
      documents = {
        'documents': data
      };
    }


    // console.log(data);
    var userToken = 'Bearer ' + token;
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'parties/documents', documents, options);

  }

  uploadCPIC(cpicObject, token): Observable<any> {

    var data = [];
    var documents = {};

    data = [
      cpicObject
    ];

    documents = {
      'documents': data
    }

    var userToken = 'Bearer ' + token;
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'parties/documents', documents, options);

  }

  activate(email, verificationCode, code ): Observable<any> {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() +
     'sessions/account/confirmations/' + email + 
     '/' + verificationCode + 
     '/' + code, 
     '', options);
  }

  resetPwd(object: any): Observable<any> {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'sessions/reset/pwd', object, options)
  }

  requestPwdReset(email: string): Observable<any> {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sharedService.getUrl() + 'sessions/reset/pwd/' + email, '', options)
  }
}
