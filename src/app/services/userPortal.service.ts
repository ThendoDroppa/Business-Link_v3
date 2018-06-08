import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SharedService } from './../services/shared.service';
import { User } from '../models/user';

@Injectable()
export class UserPortalService {



    constructor(private http: Http, private httpClient: HttpClient,
        private sharedService: SharedService) {
    }

    //get company's information by users ID

    public getCompanyInfor(token, owneroid): Observable<any> {
        var userToken = "Bearer " + token;

        return this.httpClient.get(this.sharedService.getUrl() + "parties/company/invoice/list/" + owneroid,
            {
                headers: new HttpHeaders().set("Accept", 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', userToken)
            });

    }



    //get company's invoice by company ID
    public getCompanInvoice(token, companyOid): Observable<any> {
        var userToken = "Bearer " + token;

        return this.httpClient.get(this.sharedService.getUrl() + "parties/bill/documents/retrieve/invoice/" + companyOid,
            {
                headers: new HttpHeaders().set("Accept", 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', userToken)
            });

    }



    public getCompanyQuotes(Usertoken, companyOid): Observable<any> {
        var userToken = "Bearer " + Usertoken;

        return this.httpClient.get(this.sharedService.getUrl() + "parties/bill/documents/retrieve/quotes/" + companyOid,
            {
                headers: new HttpHeaders().set("Accept", 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', userToken)
            });

    }

    public addNewCompany(user: any, company: any): Observable<any> {

        console.log(user);

        var companyData = {
            "director": company.director,
            "telephone": company.telephone,
            "email": company.email,
            "companyName": company.companyName,
            "addressLine1": company.addressLine1,
            "addressLocality": company.addressLocality,
            "addressTown": company.addressTown,
            "postalCode": company.postalCode,
            "companyRegistrationNo": company.compRegNo,
            "owner": user.owner.oid
        };


        var token = "Bearer " + user.token;
        console.log(token);
        return this.httpClient.post(this.sharedService.getUrl() + "parties/company/invoice/create", companyData,
            {
                headers: new HttpHeaders().set("Accept", 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', token)
            });



    }

    public downloadQuote(quoteData: any, userToken) {


        var token = "Bearer " + userToken;
        console.log(token);
        return this.httpClient.post(this.sharedService.getUrl() + "parties/company/quotation", quoteData,
            {
                headers: new HttpHeaders().set("Accept", 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', token)
            });

    }
    //parties/company/invoice
  
    public downloadInvoice(invoiceData: any, userToken) {


        var token = "Bearer " + userToken;
        //console.log(invoiceData);
        return this.httpClient.post(this.sharedService.getUrl() + "parties/company/invoice", invoiceData,
            {
                headers: new HttpHeaders().set("Accept", 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', token)
            });

    }

     



}
