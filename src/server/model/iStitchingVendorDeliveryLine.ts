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
import { IStitchingVendorDeliveryTx } from './iStitchingVendorDeliveryTx';
import { IStitchingVendorLine } from './iStitchingVendorLine';


export interface IStitchingVendorDeliveryLine { 
    transaction?: IStitchingVendorDeliveryTx;
    amount?: number;
    rate?: number;
    quantity?: number;
    vendorLine?: IStitchingVendorLine;
    description?: string;
    id?: number;
    jacksontype?: string;
}