/**
 * 
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { IContactAddress } from './iContactAddress';
import { IDocument } from './iDocument';
import { ILedgerLabel } from './iLedgerLabel';


export interface IBroker { 
    stateName?: string;
    addressList?: Array<IContactAddress>;
    email?: string;
    mobile?: string;
    labels?: Array<ILedgerLabel>;
    cityId?: number;
    cityName?: string;
    stateId?: number;
    ledger?: boolean;
    images?: Array<IDocument>;
    pinCode?: string;
    fatherName?: string;
    weblink?: string;
    faxNo?: string;
    bankAcNo?: string;
    bankName?: string;
    branchName?: string;
    uid?: string;
    alternateNo2?: string;
    contactPerson?: string;
    alternateNo1?: string;
    alternateEmail?: string;
    bankIfscCode?: string;
    grandFatherName?: string;
    accountName?: string;
    dateOfBirth?: Date;
    dateMarriageAnniversary?: Date;
    address?: string;
    name?: string;
    description?: string;
    importedId?: number;
    logInfo?: string;
    productUserId?: number;
    creationdate?: Date;
    productUserName?: string;
    modificationdate?: Date;
    impCompanyGuid?: string;
    id?: number;
    jacksontype?: string;
}
