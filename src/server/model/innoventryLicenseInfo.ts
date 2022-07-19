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
import { InnoventryEditionFeatureInfo } from './innoventryEditionFeatureInfo';


export interface InnoventryLicenseInfo { 
    contactPerson?: string;
    firmName?: string;
    mobile?: string;
    email?: string;
    alternateEmail?: string;
    alternatePhone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    amcDate?: Date;
    expiryDate?: Date;
    editions?: Array<InnoventryEditionFeatureInfo>;
    address2?: string;
    yearly?: boolean;
    renewRate?: number;
    renewMrp?: number;
}