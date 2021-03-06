import { User } from './user';

export class Company {

    director: string;
    telephone: string;
    companyName: string;
    addressLine1: string;
    addressLocality: string;
    addressTown: string;
    postalCode: string;
    companyRegistrationNo: string;
    base64Logo: string;
    owner: User;
    email: string;

    constructor (director: string, telephone: string, companyName: string, addressLine1: string,
        addressLocality: string, addressTown: string, postalCode: string, companyRegistrationNo: string, base64Logo: string, email: string)
    {
        this.director = director;
        this.telephone = telephone;
        this.companyName = companyName;
        this.addressLine1 = addressLine1;
        this.addressLocality = addressLocality;
        this.addressTown = addressTown;
        this.postalCode = postalCode;
        this.companyRegistrationNo = companyRegistrationNo;
        this.base64Logo = base64Logo;
        this.email = email;
    }
}

