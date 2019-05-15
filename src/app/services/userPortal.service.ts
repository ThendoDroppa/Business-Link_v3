import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SharedService } from './../services/shared.service';
import { User } from '../models/user';

@Injectable()
export class UserPortalService {

    constructor(private http: Http, private httpClient: HttpClient, private sharedService: SharedService) { }

    // get company's information by users ID
    public getCompanyInfor(token, owneroid): Observable<any> {
        const userToken = 'Bearer ' + token;
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/company/invoice/list/' + owneroid,
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', userToken)
        });
    }

    // get company's invoice by company ID
    public getCompanInvoice(token, companyOid): Observable<any> {
        const userToken = 'Bearer ' + token;

        return this.httpClient.get(this.sharedService.getUrl() + 'parties/bill/documents/retrieve/invoice/' + companyOid,
            {
                headers: new HttpHeaders().set('Accept', 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', userToken)
            });

    }

    public getCompanyQuotes(Usertoken, companyOid): Observable<any> {
        const userToken = 'Bearer ' + Usertoken;

        return this.httpClient.get(this.sharedService.getUrl() + 'parties/bill/documents/retrieve/quotes/' + companyOid,
        {
            headers: new HttpHeaders().set('Accept', 'application/json').
            set('Content-Type', 'application/json').set('Authorization', userToken)
        });
    }

    public addNewCompany(user: any, company: any): Observable<any> {
        console.log(user);
        const companyData = {
            'director': company.director,
            'telephone': company.telephone,
            'email': company.email,
            'companyName': company.companyName,
            'addressLine1': company.addressLine1,
            'addressLocality': company.addressLocality,
            'addressTown': company.addressTown,
            'postalCode': company.postalCode,
            'companyRegistrationNo': company.companyRegistrationNo,
            'base64Logo': company.base64Logo,
            'owner': user.owner.oid
        };
        console.log(company.companyRegistrationNo);
        console.log(company.email);
        console.log(companyData);

        const token = 'Bearer ' + user.token;
        console.log(token);
        return this.httpClient.post(this.sharedService.getUrl() + 'parties/company/invoice/create', companyData,
            {
                headers: new HttpHeaders().set('Accept', 'application/json').
                set('Content-Type', 'application/json').set('Authorization', token)
            });
    }

    public downloadQuote(quoteData: any, userToken) {
        const token = 'Bearer ' + userToken;
        console.log(token);
        return this.httpClient.post(this.sharedService.getUrl() + 'parties/company/quotation', quoteData,
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', token)
        });

    }
    // parties/company/invoice

    public downloadInvoice(invoiceData: any, userToken) {
        const token = 'Bearer ' + userToken;
        // console.log(invoiceData);
        return this.httpClient.post(this.sharedService.getUrl() + 'parties/company/invoice', invoiceData,
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', token)
        });
    }

    uploadProfilePic(image, token) {

        const tokens = 'Bearer ' + token;
        console.log(token);
        return this.httpClient.post(this.sharedService.getUrl() + 'parties/persons/avatars', image,
            {
                headers: new HttpHeaders().set('Accept', 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', tokens)
            });
    }

    getProfilePic(userID, token) {

        // const tokens = "Bearer " + token;

        // var headers = new Headers();
        // headers.append("Accept", 'application/json');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', tokens);
        // let options = new RequestOptions({ headers: headers });
        // return this.http.get(this.url + "parties/persons/avatars/" + userID, options);

        const userToken = 'Bearer ' + token;
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/persons/avatars/' + userID,
        {
            headers: new HttpHeaders().set('Accept', 'application/json').
            set('Content-Type', 'application/json').set('Authorization', userToken)
        });

    }
}
