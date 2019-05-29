import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { Company } from '../models/company';
import { SharedService } from './../services/shared.service';
import { User } from '../models/user';

@Injectable()
export class AdminService {

    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    }

    public getAllUsers(token): Observable<any> {
        var userToken = 'Bearer ' + token;
        // console.log(userToken);
        return this.httpClient.get(this.sharedService.getUrl() + 'admin/accounts',
            {
                headers: new HttpHeaders().
                set('Accept', 'application/json').
                set('Content-Type', 'application/json').
                set('Authorization', userToken)
            });
    }

    public getAllCompanies(token): Observable<any> {
        var userToken = 'Bearer ' + token;
        //console.log(userToken);
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/company/invoice/retrieve/all',
            {
                headers: new HttpHeaders().
                set('Accept', 'application/json').
                set('Content-Type', 'application/json').
                set('Authorization', userToken)
            });
    }

    public getAllInvoices(token): Observable<any> {
        var userToken = 'Bearer ' + token;
        console.log(userToken);
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/company/invoice/all',
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', userToken)
        });
    }

    public getAllQuotes(token): Observable<any> {
        var userToken = 'Bearer ' + token;
        console.log(userToken);
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/company/quotes/all',
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', userToken)
        });
    }

    public getCompany(token: string, companyOid: string) {
        // parties/company/invoice/retrieve/'+$scope.quote.companyOid
        var userToken = 'Bearer ' + token;
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/company/invoice/retrieve/' + companyOid,
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', userToken)
        });
    }

    public downloadQuote(quoteData: any, userToken) {
        var token = 'Bearer ' + userToken;
        return this.httpClient.post(this.sharedService.getUrl() + 'parties/company/quotation', quoteData,
        {
            headers: new HttpHeaders().
            set('Accept', 'application/json').
            set('Content-Type', 'application/json').
            set('Authorization', token)
        });
    }

    public downloadInvoice(invoiceData: any, userToken) {
        var token = 'Bearer ' + userToken;
        return this.httpClient.post(this.sharedService.getUrl() + 'parties/company/invoice', invoiceData,
            {
                headers: new HttpHeaders().set('Accept', 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', token)
            });
    }

    public getAllUserCompanies(token: string, userOid: string) {
        var userToken = 'Bearer ' + token;
        return this.httpClient.get(this.sharedService.getUrl() + 'parties/company/invoice/list/' + userOid,
        {
            headers: new HttpHeaders().set('Accept', 'application/json').
            set('Content-Type', 'application/json').set('Authorization', userToken)
        });
    }

    public block(userToken: string, email: string) {
        var token = 'Bearer ' + userToken;
        return this.httpClient.post(this.sharedService.getUrl() + 'admin/block/' + email, '',
            {
                headers: new HttpHeaders().set('Accept', 'application/json').
                    set('Content-Type', 'application/json').set('Authorization', token)
            });
    }

    public activate(userToken: string, email: string) {
        const token = 'Bearer ' + userToken;
        return this.httpClient.post(this.sharedService.getUrl() + 'admin/activate/' + email, '',
            {
                headers: new HttpHeaders().
                set('Accept', 'application/json').
                set('Content-Type', 'application/json').
                set('Authorization', token)
            });
    }
}
